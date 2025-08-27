import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";
import { getIndustryInsights } from "@/actions/dashboard";
import DashboardView from "./_components/dashboard-view";

const IndustryInsightsPage = async () => {
  const { isOnboarded } = await getUserOnboardingStatus();

  if (!isOnboarded) {
    redirect("/onboarding");
  }

  let insights = null;
  try {
    insights = await getIndustryInsights();
  } catch (e) {
    // If getIndustryInsights throws (e.g. no industry set), treat as no insights
    insights = null;
  }

  if (!insights) {
    redirect("/onboarding");
  }

  return (
    <div className="container mx-auto">
      <DashboardView insights={insights} />
    </div>
  );
};

export default IndustryInsightsPage;