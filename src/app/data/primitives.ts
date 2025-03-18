import { PrimitiveType } from "@/app/types/primitives";
import { primitiveData2 } from "./legacyData";
import { GITHUB_OWNER, GITHUB_REPO, GITHUB_API_BASE } from "./constants";

export interface PrimitiveItem {
  type: PrimitiveType;
  title: string;
  number?: number;
  isAction?: boolean;
  isCodebase?: boolean;
}

// Add constants at the top
const baseUrl = "https://api.github.com";

// New empty data structure for GitHub API data
export const primitiveData: Record<PrimitiveType, PrimitiveItem[]> = {
  file: [],
  folder: [],
  pr: [],
  issue: [],
  project: [],
  space: [],
  codebase: [],
  repository: [],
};

const CACHE_KEY = "github_data_cache";
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

interface CacheData {
  timestamp: number;
  data: Record<PrimitiveType, PrimitiveItem[]>;
}

export function clearGitHubCache() {
  localStorage.removeItem(CACHE_KEY);
}

export async function fetchGitHubData(forceRefresh = false) {
  try {
    // Clear cache if force refresh
    if (forceRefresh) {
      clearGitHubCache();
    }

    // Check cache first
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData && !forceRefresh) {
      const { timestamp, data } = JSON.parse(cachedData) as CacheData;
      const isExpired = Date.now() - timestamp > CACHE_DURATION;

      if (!isExpired) {
        console.log("Using cached GitHub data");
        return data;
      }
    }

    // Cache miss or expired, fetch fresh data
    const data = { ...primitiveData2 };

    // Fetch contents, PRs, issues, and projects in parallel
    const [contentsResponse, prsResponse, issuesResponse] = await Promise.all([
      // Get root contents - this gives us first level files/folders efficiently
      fetch(`${baseUrl}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents`, {
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        },
      }),
      fetch(
        `${baseUrl}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/pulls?per_page=10&state=open`,
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
            Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
          },
        }
      ),
      fetch(
        `${baseUrl}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues?per_page=10&state=open&pulls=false`,
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
            Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
          },
        }
      ),
    ]);

    const [contentsData, prsData, issuesData] = await Promise.all([
      contentsResponse.json(),
      prsResponse.json(),
      issuesResponse.json(),
    ]);

    // Process root contents (both files and folders)
    if (Array.isArray(contentsData)) {
      // Process folders
      data.folder = contentsData
        .filter((item) => item.type === "dir")
        .slice(0, 10)
        .map((folder) => ({
          type: "folder",
          title: folder.name,
        }));

      // Process files
      data.file = contentsData
        .filter((item) => item.type === "file")
        .slice(0, 10)
        .map((file) => ({
          type: "file",
          title: file.name,
        }));
    }

    // Process data...
    if (Array.isArray(prsData)) {
      data.pr = prsData.map((pr: any) => ({
        type: "pr",
        title: pr.title,
        number: pr.number,
        url: pr.html_url,
      }));
    }
    console.log(prsData);

    if (Array.isArray(issuesData)) {
      data.issue = issuesData.map((issue: any) => ({
        type: "issue",
        title: issue.title,
        number: issue.number,
        url: issue.html_url,
      }));
    }

    // Cache the fresh data
    const cacheData: CacheData = {
      timestamp: Date.now(),
      data,
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));

    return data;
  } catch (error) {
    console.error("Error fetching GitHub data:", error);

    // On error, try to use cached data even if expired
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      const { data } = JSON.parse(cachedData) as CacheData;
      return data;
    }

    // If no cache available, fall back to static data
    return primitiveData2;
  }
}
