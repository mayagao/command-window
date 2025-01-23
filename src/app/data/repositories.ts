export interface Repository {
  owner: string;
  name: string;
  description: string;
  stars: number;
  url: string;
  // Adding fields to match Command interface structure
  title: string;
  subtitle: string;
  icon?: string;
}

// Initial set of featured repositories
export const FEATURED_REPOSITORIES: Repository[] = [
  {
    owner: "github",
    name: "copilot-api",
    description: "The engineering system of AI at GitHub",
    stars: 0,
    url: "https://github.com/github/copilot-api",
    title: "copilot-api",
    subtitle: "The engineering system of AI at GitHub",
    icon: "📚",
  },
  {
    owner: "openai",
    name: "openai-cookbook",
    description: "Examples and guides for using the OpenAI API",
    stars: 61300,
    url: "https://github.com/openai/openai-cookbook",
    title: "openai-cookbook",
    subtitle: "Examples and guides for using the OpenAI API",
    icon: "🧪",
  },
  {
    owner: "huggingface",
    name: "transformers",
    description:
      "State-of-the-art Machine Learning for PyTorch, TensorFlow, and JAX",
    stars: 138000,
    url: "https://github.com/huggingface/transformers",
    title: "transformers",
    subtitle: "🤗 State-of-the-art ML for PyTorch, TensorFlow, and JAX",
    icon: "🤗",
  },
  {
    owner: "langchain-ai",
    name: "langchain",
    description: "⚡ Build context-aware reasoning applications ⚡",
    stars: 98800,
    url: "https://github.com/langchain-ai/langchain",
    title: "langchain",
    subtitle: "🦜🔗 Build context-aware reasoning applications",
    icon: "🦜",
  },
];
