import { json } from "@remix-run/node";
import { createStoryFromCharacter } from "~/services/storyService";

export async function action({ request }: any) {
  const { selectedCharacter } = await request.json();
  const story = await createStoryFromCharacter(selectedCharacter);
  return json({ story });
}
