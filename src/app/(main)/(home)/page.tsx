import AllPosts from "@/components/AllPosts";

const Home = async () => {
  return (
    <main className="flex items-center justify-center flex-col gap-4 p-0 sm:p-4 md:px-8">
      {/* <div className="ring-1 ring-rose-500 w-full ">stroy</div> */}
      <AllPosts />
    </main>
  );
};
export default Home;
