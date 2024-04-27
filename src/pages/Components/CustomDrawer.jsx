import { Drawer } from "vaul";
import LinkArrowTopRight from "./LinkArrowTopRight";

const CustomDrawer = ({ setDrawerOpen, drawerOpen, selectedWord, meaning }) => {
  const allMeanings = meaning?.meanings || [];
  const wordURL = meaning?.sourceUrls[0] || "";

  return (
    <Drawer.Root
      onClose={() => {
        setDrawerOpen(false);
      }}
      open={drawerOpen}
    >
      <Drawer.Trigger asChild></Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay
          onClick={() => {
            setDrawerOpen(false);
          }}
          className="fixed inset-0 bg-black/40"
        />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-[2147483647] mt-24 flex flex-col rounded-t-[10px] bg-zinc-100 font-sans focus-within:outline-none">
          <div className="flex-1 rounded-t-[10px] bg-white p-4">
            <div className="mx-auto mb-2 h-1.5 w-12 flex-shrink-0 rounded-full bg-zinc-300" />
            <div className="mx-auto max-w-md">
              <h1 className="mb-4 text-center text-base font-bold">
                {selectedWord}
              </h1>
              <h2 className="text-base font-bold text-gray-400">Dictionary</h2>
              <div className="my-2 w-full border border-gray-100"></div>
              {!meaning ? (
                <a
                  className="gap-0.25 flex w-max items-center text-xs text-gray-400"
                  href={`https://www.google.com/search?q=${selectedWord}`}
                  target="_blank"
                >
                  Sorry no meaning found, click here to google instead
                  <LinkArrowTopRight />
                </a>
              ) : null}
              {allMeanings?.map((meaning, index, allMeaningsArray) => {
                return (
                  <div key={index} className="flex flex-col">
                    <div className="flex gap-3">
                      <span className="font-bold">{selectedWord}</span>
                      <span>|</span>
                      <span>{meaning.partOfSpeech}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      {meaning.definitions.map((definition, index) => {
                        return index <= 1 ? (
                          <p className="text-gray-500">
                            <span>{index + 1}. </span>
                            {definition.definition}
                          </p>
                        ) : null;
                      })}
                      <a
                        className="gap-0.25 flex w-max items-center text-xs text-gray-400"
                        href={wordURL}
                        target="_blank"
                      >
                        wiktionary
                        <LinkArrowTopRight />
                      </a>

                      {index < allMeaningsArray.length - 1 ? (
                        <div className="my-2 w-full border border-gray-100"></div>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default CustomDrawer;
