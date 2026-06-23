import GalleryItem from "./GalleryItem";

const Gallery = () => {
  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-screen-2xl">
        <GalleryItem
          galleryData={[
            {
              id: 1,
              img: "https://static.wixstatic.com/media/68449a_3e754990bcee493a8037f90be4055c41~mv2.png/v1/fill/w_588,h_330,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/68449a_3e754990bcee493a8037f90be4055c41~mv2.png",
            },
            {
              id: 2,
              img: "https://image-barbers.co.uk/wp-content/uploads/sb-instagram-feed-images/329425892_1125299248136112_8486933333597335811_nfull.webp",
            },
            {
              id: 3,
              img: "https://media.istockphoto.com/id/2157531589/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%BF%D0%B0%D1%80%D0%B8%D0%BA%D0%BC%D0%B0%D1%85%D0%B5%D1%80-%D0%BF%D0%BE%D0%B4%D1%81%D1%82%D1%80%D0%B8%D0%B3%D0%B0%D0%B5%D1%82-%D0%B1%D0%BE%D1%80%D0%BE%D0%B4%D1%83-%D0%BA%D0%BB%D0%B8%D0%B5%D0%BD%D1%82%D0%B0-%D0%B2-%D0%BF%D0%B0%D1%80%D0%B8%D0%BA%D0%BC%D0%B0%D1%85%D0%B5%D1%80%D1%81%D0%BA%D0%BE%D0%B9-%D0%BC%D0%B0%D0%BB%D0%BE%D0%BC-%D0%B1%D0%B8%D0%B7%D0%BD%D0%B5%D1%81%D0%B5.jpg?s=612x612&w=0&k=20&c=KZp4nNBgu_3yiHjspSs3nA5dqzEtjgLtw_Rds8dpyr8=",
            },
            {
              id: 4,
              img: "https://media.istockphoto.com/id/506514230/photo/beard-grooming.jpg?s=612x612&w=0&k=20&c=QDwo1L8-f3gu7mcHf00Az84fVU8oNpQLgvUw6eGPEkc=",
            },
            {
              id: 5,
              img: "https://image-barbers.co.uk/wp-content/uploads/sb-instagram-feed-images/417923405_1669841117152053_6064650726214708802_nfull.webp",
            },
            {
              id: 6,
              img: "https://avatars.mds.yandex.net/get-altay/13925334/2a000001939da9619fe78ebbeed0fa42817b/L_height",
            },
          ]}
        />
      </div>
    </section>
  );
};

export default Gallery;
