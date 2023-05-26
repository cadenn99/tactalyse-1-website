import React from "react";
import Head from "next/head";
import Header from "../components/general/Header";
import Banner from "@/components/index/Banner";
import Benefits from "@/components/index/benefits/Benefits";
import FrequentlyAskedQuestions from "@/components/index/FrequentlyAskedQuestions";
import Footer from "@/components/general/Footer";
import TimeLineProcess from "@/components/index/TimeLineProcess";
import Pricing from "@/components/index/pricing/Pricing";
import PricingCard from "@/components/index/pricing/PricingCard";
import { useRouter } from "next/router";
import BenefitCard from "@/components/index/benefits/BenefitCard";
import { CgGym } from "react-icons/cg";
import { FaHandshake } from "react-icons/fa";
import { TbPigMoney } from "react-icons/tb";
import { BsPeopleFill } from "react-icons/bs";
import Discord from "@/components/index/Discord";
import { useDark } from "@/hooks/useDark";
/**
 * This function loads the home page.
 * @returns HTMl for the / page.
 */
export default function Home() {
  useDark();
  const { push } = useRouter();
  return (
    <div className="px-2">
      <Head>
        <title>Home | Tactalyse</title>
      </Head>
      <Header />

      <main className="max-w-7xl mx-auto mt-0 flex flex-col gap-10 min-h-screen">
        <Banner />

        <Benefits>
          <BenefitCard
            icon={<CgGym className="w-10 h-10 dark:text-white" />}
            text="Improved player development"
          />
          <BenefitCard
            icon={<FaHandshake className="w-10 h-10 dark:text-white" />}
            text="Better team cohesion"
          />
          <BenefitCard
            icon={<TbPigMoney className="w-10 h-10 dark:text-white" />}
            text="Increased revenue"
          />
          <BenefitCard
            icon={<BsPeopleFill className="w-10 h-10 dark:text-white" />}
            text="Objective analysis"
          />
        </Benefits>

        <TimeLineProcess />

        <Pricing>
          <PricingCard
            title="Tactical Report"
            price="49,-"
            reasons={["Detailed Tactical Report", "24/7 support", "1 report"]}
            cta={() => push("/order")}
            ctaText="Get Report"
          />
          <PricingCard
            title="Tactical Report"
            enterprise={true}
            reasons={["Custom amount", "24/7 support", "Infinite reports"]}
            cta={() => push("/contact")}
            ctaText="Get in contact"
            scale={0.9}
          />
        </Pricing>

        <FrequentlyAskedQuestions />

        <Discord />

        <Footer />
      </main>
    </div>
  );
}
