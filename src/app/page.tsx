import Stories from "../components/HomePage/Stories";
import AddPost from "../components/HomePage/AddPost";
import Feed from "../components/HomePage/Feeds/Feed";
import RightMenue from "../components/HomePage/RightMenue/RightMenue";
import LeftMenu from "../components/HomePage/LeftMenue/LeftMenue";

const Homepage = () => {
  return (
    <div className="flex justify-center gap-6 pt-6">
      {/* Left Menue*/}
      <div className="hidden xl:block w-[20%] sticky top-6 h-fit self-start">
        <LeftMenu type="home" />
      </div>

      {/* center*/}
      <div className="w-full lg:w-[45%] xl:w-[45%] mx-auto">
        <div className="flex flex-col gap-6 pb-10">
          <Stories />
          <AddPost />
          <Feed />
        </div>
      </div>

      {/* Right Menue*/}
      <div className="hidden lg:block w-[30%] sticky top-6 bottom-4 h-fit self-start">
        <RightMenue />
      </div>
    </div>
  );
};

export default Homepage;
