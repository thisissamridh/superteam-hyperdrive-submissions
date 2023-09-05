import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();

  return (
    <div className="w-full sm:px-8">
      <div className="mx-auto w-full max-w-7xl lg:px-8">
        <div className="relative w-full">
          <div className="h-64 bg-gradient-to-t from-[#5522e0_-126.34%] md:h-128 lg:to-[rgba(0,0,0,0)_82.81%]">
            <img
              className="h-64 w-full md:h-full"
              src={`${router.basePath}/assets/images/site-image.png`}
              alt="Superteam"
            />
            <div className="flex items-center justify-center">
              <p className="absolute bottom-0 left-1/2 z-10 m-0 -translate-x-1/2 -translate-y-1/2 text-center text-lg text-zinc-100 md:text-3xl">
                Explore a curated list of <br />
                <span className="font-bold text-[#14F195]">
                  Hyperdrive
                </span>{' '}
                hackathon submissions
                <br />
                made by{' '}
                <span className="font-bold text-superteam-secondary">
                  Superteam
                </span>{' '}
                Members
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
