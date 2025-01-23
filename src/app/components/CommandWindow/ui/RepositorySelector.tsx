import { FEATURED_REPOSITORIES } from "@/app/data/repositories";
import { useCommandWindowState } from "../state/useCommandWindowState";
import { ListItem } from "../list/ListItem";
import { ListContainer } from "../list/ListContainer";

export function RepositorySelector() {
  const { selectedRepository, handleRepositorySelect, selectedIndex } =
    useCommandWindowState();

  return (
    <ListContainer>
      {FEATURED_REPOSITORIES.map((repo, index) => (
        <ListItem
          key={`${repo.owner}/${repo.name}`}
          title={repo.title}
          description={repo.description}
          isSelected={selectedRepository?.name === repo.name}
          index={index}
          type="repository"
          isSelected={index === selectedIndex}
          onSelect={() => handleRepositorySelect(repo)}
          highlightMatches={(text) => text}
        />
      ))}
    </ListContainer>
  );
}
