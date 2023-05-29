import { Accordion } from "flowbite-react";
import React from "react";

function FrequentlyAskedQuestions() {
  return (
    <div id="faq">
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
              Our tactical football reports provide an in-depth analysis of
              player movements, tactical strategies, and key influencing factors
              that affect game results. We identify areas for improvement and
              provide valuable recommendations for how to adjust your game plan
              to maximize your team&apos;s chances of success.
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
              Yes, we offer the flexibility to deliver personalized reports that
              precisely align with your team&apos;s unique needs and
              requirements. Whether it&apos;s individual player analysis,
              game-specific insights, or strategic evaluations, our customized
              reports empower your team to make informed decisions and embrace a
              data-driven approach to your game.
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
              improvement, our tactical football reports play a crucial role in
              facilitating effective player development for teams and coaches.
              This includes creating personalized training programs, identifying
              potential new recruits, and helping players improve their skills
              and technique.
            </p>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>
            Can your reports help us gain a competitive edge over our opponents?
          </Accordion.Title>
          <Accordion.Content>
            <p className="dark:text-[#848C99]">
              Yes, with the utilization of our tactical football reports, teams
              can secure a competitive advantage over their opponents. Having
              access to detailed analysis and insights enables teams to identify
              weaknesses in their opponent&apos;s play and adjust their own
              tactics accordingly. This strategic adjustment can provide a
              substantial edge during matches, significantly enhancing their
              prospects of winning.
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
              tactical analysis fans can deepen their understanding of the game
              and develop a greater appreciation for the strategies and tactics
              employed by their favorite teams and players. This can lead to
              increased fan engagement and loyalty, which can benefit the team
              both on and off the field.
            </p>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>
            What leagues are covered by Tactalyse according to the data?
          </Accordion.Title>
          <Accordion.Content>
            <p className="dark:text-[#848C99]">
              Tactalyse covers a total of 20 leagues, and if there is any
              uncertainty, please feel free to reach out to us via email for
              assistance, ensuring a refund if necessary.
            </p>
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    </div>
  );
}

export default FrequentlyAskedQuestions;
