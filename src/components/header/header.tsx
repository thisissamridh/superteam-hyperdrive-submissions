import Link from 'next/link';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();

  return (
    <div className="w-full sm:px-8">
      <div className="mx-auto w-full max-w-7xl lg:px-8">
        <div className="relative w-full">
          <div className="h-64 bg-gradient-to-t from-[#5522e0_-126.34%] md:h-128 lg:to-[rgba(0,0,0,0)_82.81%]">
            <img
              className="absolute top-0 left-0 h-full w-full object-cover"
              src={`${router.basePath}/assets/images/new-site-image.png`}
              alt="Superteam"
            />
            <img
              className="absolute top-4 right-4 h-[5vw] max-h-[100px] min-h-[50px] w-[5vw] min-w-[50px] max-w-[100px]"
              src={`${router.basePath}/assets/logo/logo-yellow.png`}
              alt="Logo"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <p className="text-center font-bebas-neue text-lg text-zinc-100 md:text-3xl">
                Explore{' '}
                <span className="font-bold  text-[#11F195]">Hyperdrive</span>{' '}
                hackathon submissions made by{' '}
                <Link
                  href="https://superteam.fun/"
                  className="font-bold  text-superteam-secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Superteam
                </Link>{' '}
                members
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
