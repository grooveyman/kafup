export type OrderStatus = "Pending" | "Completed";

export type RecentOrder = {
  id: string;
  date: string;
  status: OrderStatus;
  total: string;
  items: number;
};

export const recentOrders: RecentOrder[] = [
  { id: "#KF-1050", date: "17 Nov 2026", items: 2, status: "Pending", total: "$36.00" },
  { id: "#KF-1049", date: "16 Nov 2026", items: 1, status: "Pending", total: "$54.00" },
  { id: "#KF-1048", date: "16 Nov 2026", items: 3, status: "Pending", total: "$28.50" },
  { id: "#KF-1047", date: "15 Nov 2026", items: 2, status: "Pending", total: "$72.00" },
  { id: "#KF-1046", date: "14 Nov 2026", items: 1, status: "Pending", total: "$45.00" },
  { id: "#KF-1045", date: "13 Nov 2026", items: 2, status: "Pending", total: "$32.00" },
  { id: "#KF-1042", date: "26 Oct 2026", items: 1, status: "Completed", total: "$48.00" },
  { id: "#KF-1038", date: "22 Oct 2026", items: 1, status: "Completed", total: "$32.50" },
  { id: "#KF-1037", date: "20 Oct 2026", items: 1, status: "Completed", total: "$65.00" },
  { id: "#KF-1035", date: "18 Oct 2026", items: 1, status: "Completed", total: "$41.00" },
  { id: "#KF-1034", date: "14 Oct 2026", items: 1, status: "Completed", total: "$29.50" },
  { id: "#KF-1032", date: "10 Oct 2026", items: 1, status: "Completed", total: "$58.00" },
  { id: "#KF-1028", date: "06 Oct 2026", items: 1, status: "Completed", total: "$37.00" },
  { id: "#KF-1026", date: "02 Oct 2026", items: 1, status: "Completed", total: "$44.00" },
  { id: "#KF-1021", date: "28 Sep 2026", items: 1, status: "Completed", total: "$52.00" },
  { id: "#KF-1018", date: "23 Sep 2026", items: 1, status: "Completed", total: "$39.00" },
];
