import {
  GameIcon,
  HomeIcon,
  LeaderboardIcon,
  HistoryIcon,
} from "@/components/svgIcons";

export interface LinkType {
  title: string;
  link: string;
  icon: any;
}

export const GAME_FEE = 0.03;
export const FEE_WALLET = "FvkMuqSXG96vh2LDknDjQHZDmzMhNBcpymhFV94vHJiX";
export const GAME_WALLET_0 = "2CZe3crbw7RNdDQCmHitr7XycCtVa85rZF5n38WhoR5v";
export const GAME_WALLET_1 = "FHhdtugpBKFKyNFCdvxiiqyGKBYXisY96g1uzVeL9YRf";
export const GAME_WALLET_2 = "4QwAW3PBBSrJpXczLhfEJqhBsMeEh1YNdTsUaxJD2HAE";

export const SIDE_LINKS: LinkType[] = [
  {
    title: "Home",
    link: "/",
    icon: <HomeIcon className="w-7 h-7" fill="#fff" />,
  },
  {
    title: "Games",
    link: "/play",
    icon: <GameIcon className="w-7 h-7" fill="#fff" />,
  },
  {
    title: "rewards",
    link: "/leaderboard",
    icon: <LeaderboardIcon className="w-7 h-7" fill="#fff" />,
  },
  {
    title: "History",
    link: "/history",
    icon: <HistoryIcon className="w-7 h-7" fill="#fff" />,
  },
];

export const COOLDOWN = process.env.NEXT_PUBLIC_COOL_DOWN
  ? (process.env.NEXT_PUBLIC_COOL_DOWN as unknown as number)
  : 120;
export const ROLL_TIME = 10;
export const PENDING_TIME = 5;

export const COLORS = [
  {
    color: "#DAD870",
    name: "Chartreuse",
    text: "#000",
  },
  {
    color: "#FCD858",
    name: "Mimosa",
    text: "#000",
  },
  {
    color: "#FF9636",
    name: "Orange",
    text: "#000",
  },
  {
    color: "#FF5C4D",
    name: "Red Orange",
    text: "#000",
  },
  {
    color: "#905FDD",
    name: "Purple",
    text: "#000",
  },
  {
    color: "#1120A9",
    name: "Blue Iris",
    text: "#fff",
  },
  {
    color: "#ADCF52",
    name: "Neon Green",
    text: "#000",
  },
  {
    color: "#78288d",
    name: "Indigo",
    text: "#fff",
  },
  {
    color: "#FAC218",
    name: "Amber",
    text: "#000",
  },
  {
    color: "#F6BF15",
    name: "Orange",
    text: "#000",
  },
  {
    color: "#B1599F",
    name: "Orchid",
    text: "#000",
  },
  {
    color: "#36D9E7",
    name: "Aqua",
    text: "#000",
  },
  {
    color: "#89CEFD",
    name: "Baby Blue",
    text: "#000",
  },
  {
    color: "#0074DD",
    name: "Blue",
    text: "#000",
  },
  {
    color: "#6EC3C1",
    name: "Spearmint",
    text: "#000",
  },
  {
    color: "#335120",
    name: "Green",
    text: "#fff",
  },
  {
    color: "#9DC65F",
    name: "Lime Green",
    text: "#000",
  },
  {
    color: "#105F8A",
    name: "Midnight Blue",
    text: "#fff",
  },
  {
    color: "#E80000",
    name: "Red",
    text: "#000",
  },
  {
    color: "#1E73BE",
    name: "Blue",
    text: "#000",
  },
  {
    color: "#CB5080",
    name: "Pink",
    text: "#000",
  },
  {
    color: "#6E60A0",
    name: "Orchid",
    text: "#000",
  },
  {
    color: "#FBFFCA",
    name: "Yellow Green",
    text: "#000",
  },
  {
    color: "#B6D084",
    name: "Chartreuse",
    text: "#000",
  },
  {
    color: "#FFC832",
    name: "Mimosa",
    text: "#000",
  },
  {
    color: "#4ca516",
    name: "Green",
    text: "#000",
  },
  {
    color: "#858942",
    name: "Black",
    text: "#000",
  },
  {
    color: "#FDB750",
    name: "Amber",
    text: "#000",
  },
  {
    color: "#FCE820",
    name: "Red Orange",
    text: "#000",
  },
  {
    color: "#FDF720",
    name: "Orange",
    text: "#000",
  },
  {
    color: "#F51E63",
    name: "Fuchsia",
    text: "#000",
  },
  {
    color: "#DEB3AD",
    name: "Dusty Rose",
    text: "#000",
  },
];
