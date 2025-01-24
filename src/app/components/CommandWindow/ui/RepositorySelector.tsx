import { FEATURED_REPOSITORIES } from "@/app/data/repositories";
import { useCommandWindowState } from "../state/useCommandWindowState";
import { ListItem } from "../list/ListItem";
import { ListContainer } from "../list/ListContainer";

export function RepositorySelector() {
  const { handleRepositorySelect, selectedIndex } = useCommandWindowState();

  return (
    <ListContainer>
      {FEATURED_REPOSITORIES.map((repo, index) => (
        <ListItem
          key={repo.name}
          title={repo.title}
          description={repo.description}
          index={index}
          type="repository"
          isSelected={index === selectedIndex}
          onClick={() => handleRepositorySelect(repo)}
        />
      ))}
    </ListContainer>
  );
}
