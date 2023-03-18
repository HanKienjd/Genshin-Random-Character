import { Component, createSignal, For } from 'solid-js';
import styles from './App.module.css';

import { Card } from '../Card';
import { Button } from '../Button';
import { Container } from '../Container';
import { Filters } from '../Filters';
import { characters } from '../../data/characters';
import {
  filterElements,
  filterRarity,
  selectedCharacters,
  setSelectedCharacters,
} from '../../data/store';
import { GenshinCharacter, GenshinElement } from '../../types/types';
import { shuffle } from '../../utils/utils';

const idToCard =
  (offset: number = 0) =>
  (id: GenshinCharacter['id'], index: number) =>
    (
      <Card
        index={index + offset}
        character={characters.find(c => c.id === id)}
      />
    );

const App: Component = () => {
  const [teams, setTeams] = createSignal<GenshinCharacter['id'][]>([]);
  const areAllCharatersSelected = () =>
    selectedCharacters.selectedCharacters.length === characters.length;
  const randomCharacter = () => Array.from({ length: 8 }, (_, i) => teams()[i]);
  const generateCharacter = () => {
    const rnd = shuffle(Array.from(selectedCharacters.selectedCharacters));
    setTeams(() => rnd.slice(0, 8));
  };

  return (
    <>
      <header class={styles.header}>
        <div class={styles.logo}>
        <a
          href="https://github.com/Pustur/genshin-impact-team-randomizer"
          target="_blank"
        >
        <img src="/img/icons/github.png" alt="Github" class={styles.emptyImage} />
          
          </a>
         </div>
        {/* <a
          class={styles.try}
          href="https://spiralabyss.genshinteams.online"
          target="_blank"
        >
          Randomizer with Preset Teams
        </a> */}
      </header>
      <main>
        <h1 class={styles.title}>Genshin Impact Randomizer</h1>
        <div class={styles.teams}>
          <div class={`${styles.grid} ${styles.team}`}>
            {randomCharacter().map(idToCard())}
          </div>
          {/* <div class={`${styles.grid} ${styles.team}`}>
            {team2().map(idToCard(4))}
          </div> */}
        </div>
        <div class={styles.buttons}>
          <Button
            secondary
            onClick={() =>
              setSelectedCharacters(state => ({
                ...state,
                selectedCharacters: areAllCharatersSelected()
                  ? []
                  : characters.map(c => c.id),
              }))
            }
          >
            {areAllCharatersSelected() ? 'Deselect' : 'Select'} all
          </Button>
          <Button onClick={generateCharacter}>Generate Character</Button>
        </div>
        <Container>
          <Filters />
        </Container>
        <div class={`${styles.grid} ${styles.mainGrid}`}>
          <For
            each={characters.filter(
              character =>
                (filterElements.length === 0 ||
                  filterElements.some(elem =>
                    character.elements.includes(elem as GenshinElement),
                  )) &&
                (filterRarity.length === 0 ||
                  filterRarity.includes(character.stars)),
            )}
          >
            {character => (
              <Card
                onClick={() => {
                  setSelectedCharacters(state => {
                    if (state.selectedCharacters.includes(character.id)) {
                      return {
                        ...state,
                        selectedCharacters: [
                          ...state.selectedCharacters.filter(
                            selected => selected !== character.id,
                          ),
                        ],
                      };
                    }
                    return {
                      ...state,
                      selectedCharacters: [
                        ...state.selectedCharacters,
                        character.id,
                      ],
                    };
                  });
                }}
                character={character}
              />
            )}
          </For>
        </div>
      </main>
    </>
  );
};

export { App };
