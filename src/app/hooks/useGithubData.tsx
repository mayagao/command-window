import { useState, useEffect } from "react";
import { Repository, FEATURED_REPOSITORIES } from "../data/repositories";

const GITHUB_API_BASE = "https://api.github.com";

export function useGitHubData() {
  const [repositories, setRepositories] = useState<Repository[]>(
    FEATURED_REPOSITORIES
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRepoData() {
      try {
        const updatedRepos = await Promise.all(
          FEATURED_REPOSITORIES.map(async (repo) => {
            const response = await fetch(
              `${GITHUB_API_BASE}/repos/${repo.owner}/${repo.name}`,
              {
                headers: {
                  Accept: "application/vnd.github.v3+json",
                  // Add GitHub token here if needed
                },
              }
            );

            if (!response.ok)
              throw new Error(`Failed to fetch ${repo.owner}/${repo.name}`);

            const data = await response.json();
            return {
              ...repo,
              stars: data.stargazers_count,
              description: data.description,
            };
          })
        );

        setRepositories(updatedRepos);
        setLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch repository data"
        );
        setLoading(false);
      }
    }

    fetchRepoData();
  }, []);

  return { repositories, loading, error };
}
