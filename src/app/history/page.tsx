import HistoryTable from "@/components/history/HistoryTable";
import TableTop from "@/components/history/TableTop";

export default function HistoryPage() {
  return (
    <div className="p-3 max-w-[1440px] mx-auto pb-10">
      <TableTop />
      <HistoryTable />
    </div>
  );
}
