import { useState, useEffect } from "react";
import { Repository, FEATURED_REPOSITORIES } from "../data/repositories";

const GITHUB_API_BASE = "https://api.github.com";

interface GithubApiResponse {
  issues: any[];
  pulls: any[];
  files: any[];
}

export function useGithubData(
  useRealData: boolean,
  selectedRepo: Repository | null
) {
  const [data, setData] = useState<GithubApiResponse>({
    issues: [],
    pulls: [],
    files: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGithubData() {
      if (
        !selectedRepo ||
        !useRealData ||
        selectedRepo.name === "copilot-api"
      ) {
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Fetch issues
        const issuesResponse = await fetch(
          `${GITHUB_API_BASE}/repos/${selectedRepo.owner}/${selectedRepo.name}/issues?state=open&per_page=100`,
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
          }
        );

        // Fetch PRs
        const pullsResponse = await fetch(
          `${GITHUB_API_BASE}/repos/${selectedRepo.owner}/${selectedRepo.name}/pulls?state=open&per_page=100`,
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
          }
        );

        // Fetch files (from default branch)
        const filesResponse = await fetch(
          `${GITHUB_API_BASE}/repos/${selectedRepo.owner}/${selectedRepo.name}/git/trees/main?recursive=1`,
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
          }
        );

        if (!issuesResponse.ok || !pullsResponse.ok || !filesResponse.ok) {
          throw new Error("Failed to fetch GitHub data");
        }

        const [issues, pulls, files] = await Promise.all([
          issuesResponse.json(),
          pullsResponse.json(),
          filesResponse.json(),
        ]);

        setData({
          issues: issues.map((issue: any) => ({
            title: issue.title,
            number: issue.number,
            type: "issue",
          })),
          pulls: pulls.map((pr: any) => ({
            title: pr.title,
            number: pr.number,
            type: "pr",
          })),
          files: files.tree
            .filter((file: any) => file.type === "blob")
            .map((file: any) => ({
              title: file.path,
              type: "file",
            })),
        });
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch GitHub data"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchGithubData();
  }, [selectedRepo, useRealData]);

  return { data, loading, error };
}
