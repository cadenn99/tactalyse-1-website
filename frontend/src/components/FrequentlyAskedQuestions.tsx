import { Accordion } from "flowbite-react";
import React from "react";

function FrequentlyAskedQuestions() {
  return (
    <div>
      <h1 className="text-3xl text-center font-bold mt-5 dark:text-white">
        Frequently Asked Questions
      </h1>
      <Accordion
        collapseAll={true}
        className="bg-white shadow-md mt-5 dark:bg-[#1F2937]"
      >
        <Accordion.Panel>
          <Accordion.Title>
            What kind of analysis do your tactical football reports provide?
          </Accordion.Title>
          <Accordion.Content>
            <p className="dark:text-[#848C99]">
              Our tactical football reports provide in-depth analysis of player
              movements, tactical strategies, and other important factors that
              impact the outcome of a game. We identify areas for improvement
              and provide recommendations for how to adjust your game plan to
              maximize your team&apos;s chances of success.
            </p>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>
            Can you customize your reports to meet the specific needs of our
            team?
          </Accordion.Title>
          <Accordion.Content>
            <p className="dark:text-[#848C99]">
              Yes, we can provide customized reports tailored to the specific
              needs and requirements of your team. This can include reports on
              specific players, games, or strategies, and can help your team
              make more informed decisions and take a more data-driven approach
              to your game.
            </p>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>
            How do your tactical football reports help with player development?
          </Accordion.Title>
          <Accordion.Content>
            <p className="dark:text-[#848C99]">
              By analyzing player performance and identifying areas for
              improvement, our tactical football reports can help teams and
              coaches develop their players more effectively. This can include
              developing individualized training programs, identifying potential
              new recruits, and helping players improve their skills and
              technique.
            </p>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>
            Can your reports help us gain a competitive edge over our opponents?
          </Accordion.Title>
          <Accordion.Content>
            <p className="dark:text-[#848C99]">
              Yes, by utilizing our tactical football reports, teams can gain a
              competitive edge over their opponents. Having access to detailed
              analysis and insights can help teams identify weaknesses in their
              opponent&apos;s play and adjust their own tactics accordingly.
              This can give them a significant advantage during games and
              increase their chances of winning.
            </p>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>
            How can your reports help us improve our fan engagement?
          </Accordion.Title>
          <Accordion.Content>
            <p className="dark:text-[#848C99]">
              Our tactical football reports can help teams and players engage
              with fans in a new and exciting way. By providing detailed
              tactical analysis, fans can better understand the game and
              appreciate the strategies and tactics employed by their favorite
              teams and players. This can lead to increased fan engagement and
              loyalty, which can benefit the team both on and off the field
            </p>
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    </div>
  );
}

export default FrequentlyAskedQuestions;
