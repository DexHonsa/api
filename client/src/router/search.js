import SearchHome from "@/components/search/search_home";
import ResultPage from "@/components/search/result";

export default [
    {
        path: "/search",
        components: {
          default: SearchHome
        }
      },
      {
        path: "/results/:id",
        components: {
          default: ResultPage
        }
      }
];