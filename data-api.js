// TierCheck Supabase Client - DATA FETCH + MAPPING DEBUG FIX
console.log("🔍 data-api.js LOADING...", new Date().toLocaleTimeString());

if (!window.SUPABASE_URL || !window.SUPABASE_ANON_KEY) {
  console.error("❌ NO SUPABASE CONFIG - USING FALLBACK");
  window.api = {
    fetchColleges: async (search = '') => {
      const colleges = window.colleges || [];
      console.log("RAW colleges:", colleges);
      if (search) {
        return colleges.filter(c =>
          (c.name || "").toLowerCase().includes(search.toLowerCase())
        );
      }
      return colleges;
    },
    fetchCompanies: async () => {
      const companies = window.companies || [];
      const jobs = window.jobs || [];

      console.log("RAW companies:", companies);
      console.log("RAW jobs:", jobs);

      const normalize = (s) => (s || "").trim().toLowerCase();

      const companiesWithRoles = companies.map(company => {
        const matchedJobs = jobs.filter(job =>
          normalize(job.company) === normalize(company.name)
        );

        console.log("Company:", company.name);
        console.log("Matched jobs:", matchedJobs);

        if (!matchedJobs.length) {
          console.warn("NO JOB MATCH FOUND → company.name vs jobs.company:", company.name, jobs.map(j => j.company));
        }

        return {
          ...company,
          roles: matchedJobs
        };
      });

      return companiesWithRoles;
    },
    fetchJobs: async (worth = 'all') => {
      const jobs = window.jobs || [];
      console.log("RAW jobs:", jobs);
      if (worth !== 'all') {
        return jobs.filter(j => j.worth === worth);
      }
      return jobs;
    },
    submitData: async () => {
      console.log("Fallback submit");
      return false;
    }
  };
} else {
  console.log("✅ SUPABASE CONFIG OK - FETCHING");

  const PAGE_SIZE = 1000;
  const headers = {
    apikey: window.SUPABASE_ANON_KEY,
    Authorization: `Bearer ${window.SUPABASE_ANON_KEY}`,
    "Content-Type": "application/json",
    Range: "0-999"
  };

  const normalize = (s) => (s || "").trim().toLowerCase();

  const normalizeTierValue = (tier) => {
    const value = String(tier || "").trim().toLowerCase();
    if (!value) return "t3";
    if (value === "1" || value === "t1" || value === "tier 1" || value === "tier1") return "t1";
    if (value === "2" || value === "t2" || value === "tier 2" || value === "tier2") return "t2";
    if (value === "3" || value === "t3" || value === "tier 3" || value === "tier3") return "t3";
    if (value === "4" || value === "t4" || value === "tier 4" || value === "tier4") return "t4";
    if (value.includes("t1")) return "t1";
    if (value.includes("t2")) return "t2";
    if (value.includes("t3")) return "t3";
    if (value.includes("t4")) return "t4";
    return "t3";
  };

  const parseCompanyRoles = (rawRoles) => {
    if (Array.isArray(rawRoles)) return rawRoles;
    if (!rawRoles) return [];

    if (typeof rawRoles === "string") {
      try {
        const parsed = JSON.parse(rawRoles);
        return Array.isArray(parsed) ? parsed : [];
      } catch (error) {
        console.warn("Roles parse failed:", rawRoles, error);
        return [];
      }
    }

    return [];
  };

  const supabaseFetchAll = async (table) => {
    try {
      let allRows = [];
      let start = 0;
      let keepFetching = true;

      while (keepFetching) {
        const end = start + PAGE_SIZE - 1;
        const pageHeaders = {
          ...headers,
          Range: `${start}-${end}`
        };

        const url = `${window.SUPABASE_URL}/rest/v1/${table}?select=*`;
        console.log(`🌐 FETCH ${table}: rows ${start}-${end}`);

        const res = await fetch(url, { headers: pageHeaders });

        console.log(`${table} STATUS:`, res.status, res.statusText);
        console.log(`${table} CONTENT-RANGE:`, res.headers.get("content-range"));

        if (!res.ok) {
          const errorText = await res.text();
          console.error(`💥 ${table} FETCH FAILED:`, res.status, errorText);
          return [];
        }

        const dataText = await res.text();
        console.log(`📄 RAW RESPONSE ${table} (${dataText.length} chars):`, dataText.substring(0, 300));

        let pageRows = [];
        try {
          pageRows = JSON.parse(dataText);
        } catch (error) {
          console.error(`💥 ${table} JSON PARSE ERROR:`, error, dataText.substring(0, 500));
          return [];
        }

        if (!Array.isArray(pageRows)) {
          console.error(`💥 ${table} RESPONSE IS NOT ARRAY:`, pageRows);
          return [];
        }

        console.log(`✅ FETCHED ${table} PAGE:`, pageRows.length, `rows for ${start}-${end}`);

        allRows = allRows.concat(pageRows);

        if (pageRows.length < PAGE_SIZE) {
          keepFetching = false;
        } else {
          start += PAGE_SIZE;
        }
      }

      console.log(`✅ FULL FETCHED ${table}:`, allRows.length, "items");
      console.log(`FIRST ${table} ROW:`, allRows[0] || "EMPTY");
      console.log(`LAST ${table} ROW:`, allRows[allRows.length - 1] || "EMPTY");

      if (allRows.length === 0) {
        console.warn(`⚠️ ${table} TABLE EMPTY - Check Supabase data`);
      }

      return allRows;
    } catch (error) {
      console.error(`💥 ${table} ERROR:`, error);
      console.error("FULL ERROR:", error.message);
      return [];
    }
  };

  const getAllCoreData = async () => {
    const [companies, jobs, colleges] = await Promise.all([
      supabaseFetchAll("companies"),
      supabaseFetchAll("jobs"),
      supabaseFetchAll("colleges")
    ]);

    console.log("RAW companies:", companies);
    console.log("RAW jobs:", jobs);
    console.log("RAW colleges:", colleges);

    return { companies, jobs, colleges };
  };

  window.api = {
    fetchColleges: async (search = '') => {
      const { colleges } = await getAllCoreData();

      const enrichedColleges = colleges.map(c => ({
        ...c,
        tierInfo: window.tierInfo?.[c.tier] || window.tierInfo?.[Number(c.tier)] || window.tierInfo?.[3] || {
          label: `Tier ${c.tier}`,
          color: `tier${c.tier}`,
          desc: "Default tier info"
        }
      }));

      console.log("RAW colleges:", enrichedColleges);

      if (search) {
        const filtered = enrichedColleges.filter(c =>
          normalize(c.name).includes(normalize(search))
        );
        console.log(`College results (${search}): ${filtered.length}/${enrichedColleges.length}`);
        return filtered;
      }

      console.log(`College results (all): ${enrichedColleges.length}/${enrichedColleges.length}`);
      return enrichedColleges;
    },

    fetchCompanies: async (filter = 'all') => {
      const { companies, jobs } = await getAllCoreData();

      const normalizedCompanies = companies.map(c => {
        const fallbackRoles = parseCompanyRoles(c.roles);
        const normalizedTier = normalizeTierValue(c.badgeClass || c.tier);

        const matchedJobs = jobs.filter(job =>
          normalize(job.company) === normalize(c.name)
        );

        console.log("Company:", c.name);
        console.log("Matched jobs:", matchedJobs);

        if (!matchedJobs.length) {
          console.warn("NO MATCHED JOBS FOR COMPANY");
          console.warn("company.name =", c.name);
          console.warn("normalized company.name =", normalize(c.name));
          console.warn("jobs.company values =", jobs.map(job => job.company));
          console.warn("normalized jobs.company values =", jobs.map(job => normalize(job.company)));
        }

        const mappedRoles = matchedJobs.length
          ? matchedJobs.map(job => ({
              role: job.role || job.title || "Unknown Role",
              tier: job.tier || "All Tiers",
              company: job.company,
              location: job.location || "",
              worth: job.worth || ""
            }))
          : fallbackRoles;

        return {
          ...c,
          tier: normalizedTier,
          badgeClass: c.badgeClass || normalizedTier,
          t1: Number(c.t1) || 25,
          t2: Number(c.t2) || 35,
          t3: Number(c.t3) || 30,
          t4: Number(c.t4) || 10,
          roles: mappedRoles
        };
      });

      let filtered = normalizedCompanies;

      if (filter !== 'all') {
        filtered = normalizedCompanies.filter(c =>
          c.tier === filter ||
          c.badgeClass === filter ||
          normalize(c.tier).includes(normalize(filter)) ||
          normalize(c.badgeClass).includes(normalize(filter))
        );
      }

      console.log(`Company results (${filter}): ${filtered.length}/${normalizedCompanies.length}`);
      return filtered;
    },

    fetchJobs: async (worth = 'all') => {
      const jobs = await supabaseFetchAll("jobs");
      console.log("RAW jobs:", jobs);

      let filtered = jobs;
      if (worth !== 'all') {
        filtered = jobs.filter(j => j.worth === worth);
      }

      console.log(`Job results (${worth}): ${filtered.length}/${jobs.length}`);
      return filtered;
    },

    submitData: async (data) => {
      try {
        const res = await fetch(`${window.SUPABASE_URL}/rest/v1/submissions`, {
          method: 'POST',
          headers,
          body: JSON.stringify([data])
        });
        console.log("Submit:", res.status);
        return res.ok;
      } catch (error) {
        console.error("Submit failed:", error);
        return false;
      }
    }
  };

  console.log("🚀 SUPABASE READY - Use window.api.fetchCompanies()");
}

// Hide loading after 3s max
setTimeout(() => {
  const loading = document.querySelector('.loading');
  if (loading && loading.style.display !== 'none') {
    console.log("⏰ LOADING TIMEOUT - Hiding");
    loading.style.display = 'none';
  }
}, 3000);

console.log("✅ data-api.js COMPLETE - Check F12 for debug");
