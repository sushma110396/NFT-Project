import React from 'react';
import { heroStyle } from './Styles';

const Hero = () => {
    return(
        <div className={heroStyle.wrapper}>
      <div className={heroStyle.container}>
        <div className={heroStyle.contentWrapper}>
          <div className={heroStyle.copyContainer}>
            <div className={heroStyle.title}>
              Discover, collect, and sell extraordinary NFTs
            </div>
            <div className={heroStyle.description}>
              Northeastern University First NFT Marketplace
            </div>
            <div className={heroStyle.ctaContainer}>
              <button className={heroStyle.accentedButton}>Explore</button>
              <button className={heroStyle.button}>Create</button>
            </div>
          </div>
          <div className={heroStyle.cardContainer}>
            <img
              className="rounded-t-lg"
              src="https://lh3.googleusercontent.com/ujepnqpnL0nDQIHsWxlCXzyw4pf01yjz1Jmb4kAQHumJAPrSEj0-e3ABMZlZ1HEpJoqwOcY_kgnuJGzfXbd2Tijri66GXUtfN2MXQA=s550"
              alt=""
            />
            <div className={heroStyle.infoContainer}>
              <img
                className="h-[2.25rem] rounded-full"
                src="https://lh3.googleusercontent.com/qQj55gGIWmT1EnMmGQBNUpIaj0qTyg4YZSQ2ymJVvwr_mXXjuFiHJG9d3MRgj5DVgyLa69u8Tq9ijSm_stsph8YmIJlJQ1e7n6xj=s64"
                alt=""
              />
              <div className={heroStyle.author}>
                <div className={heroStyle.name}>Jolly</div>
                <a
                  className="text-[#1868b7]"
                  href="https://opensea.io/assets/0x495f947276749ce646f68ac8c248420045cb7b5e/2324922113504035910649522729980423429926362207300810036887725141691069366277"
                >
                  hola-kanola
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
}

export default Hero;