import SectionTitle from "../../../Components/Shared/SectionTitle";
import news from "../../../assets/newslatter/news.jpg";
import latter from "../../../assets/newslatter/latter.png";

const NewsLatter = () => {
  return (
    <div className="relative -bottom-24">
      <img className="w-full relative z-20 -bottom-16" src={latter} alt="" />
      <div className=" relative md:h-[100vh] h-[500px]">
        <div className="h-[100vh] md:h-[100vh] object-left-bottom" style={{}}>
          <img
            className="object-cover w-full object-left-bottom  opacity-100 md:h-[100vh] h-[500px]"
            src={news}
            alt=""
          />
        </div>
        <div className="max-w-7xl w-[90%] mx-auto">
          <div className="absolute  text-white mr-4 top-1/2  -translate-y-1/2  z-20 ">
            <h1 className=" font-extrabold my-4 text-4xl lg:text-7xl lg:leading-snug w-full">
              Subscribe Today, <br /> It's{" "}
              <span className="text-[#FF6000]">Free</span>!
            </h1>

            <SectionTitle
              label="Newsletter Subscribe"
              text="text-2xl"
            ></SectionTitle>
            <p className="relative -top-7">
              Receive our weekly updates about your favorite topics
            </p>
            <form className="flex flex-col md:flex-row  gap-6 items-center w-full ">
              <div className="border bg-[#101011] text-white border-solid border-[#5B5A5A] p-3 w-full rounded-md">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  className="px-4 md:w-fit  bg-[#101011]  text-white py-1 w-full focus:outline-0"
                />
              </div>

              <fieldset className="border w-full bg-[#101011] border-solid border-[#5B5A5A] p-3  rounded-md">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="px-4 py-1 md:w-fit bg-[#101011] text-white w-full focus:outline-0"
                />
              </fieldset>

              <button
                type="submit"
                className="py-4 px-10 w-full md:w-fit text-lg text-white bg-[#FF2400] rounded-full m-auto hover:shadow-xl font-semibold"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLatter;
