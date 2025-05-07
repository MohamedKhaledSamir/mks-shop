import BestSeller from "./BestSeller";
import BestReviewed from "./BestReviewed";
import FixedAd from "./FixedAd";
import Categories from "./Categories";
import FixedAd2 from "./FixedAd2";

export default function Home() {
  return (
    <div>
      <FixedAd />
      <FixedAd2 />
      <Categories />
      <BestSeller />
      <BestReviewed />
    </div>
  );
}
