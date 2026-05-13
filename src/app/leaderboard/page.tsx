import Layout from "@/components/pageLayout";
import LeaderboardTable from "@/components/leaderboard/LeaderboardTable";
import TableTop from "@/components/leaderboard/TableTop";

export default function LeaderboardPage() {
  return (
    // <Layout title="Leaderboard" className="font-sans">
      <div className="p-3 max-w-[1440px] mx-auto pb-10">
        <TableTop />
        <LeaderboardTable />
      </div>
    // </Layout>
  );
}
