import { NextPage } from 'next';
import Link from "next/link";

const Footer: NextPage = () => {
  const footerList = [
    {
      title: 'Société',
      list: [{ label: 'À propos de nous', link: '/' }],
    },
    {
      title: 'Assistance',
      list: [
        { label: "Centre d'assistance", link: '/' },
        { label: "Centre d'assistance pour les fournisseurs", link: '/' },
        { label: 'Conditions générales', link: '/conditions-generales' },
        { label: 'Politique de confidentialité', link: '/politique-de-confidentialite' },
        { label: "Appli Let's Go", link: '/' },
      ],
    },
    {
      title: 'Partenariats',
      list: [
        { label: 'Devenez un partenaire', link: '/' },
        { label: 'Devenez un distributeur', link: '/' },
      ],
    },
    {
      title: 'Contact info',
      list: [
        //{ label: 'Phone: 1234567890', link: 'tel:+331234567890' },
        { label: 'contact@letsgoeurope.fr', link: 'mailto:contact@letsgoeurope.fr' },
        { label: '78 Avenue des Champs-Élysées, Bureau 326, 75008 Paris'},
      ],
    },
  ];

  return (
    <footer className="c-footer o-container o-container--footer">
      <div className="c-footer__grid">
        <div>
          <Link href={"/"} className="cursor-pointer">
            <h2 className="flex items-center gap-1">
              <img className="w-[64px] h-[64px]" src="/img/LetsGo.svg" alt="logo de la sociéte" />
              <span className="u-secondary-text">Lets'GO</span>
            </h2>
          </Link>
          <p className="mt-12 u-medium-grey-text">
            Lets'Go est un service de réservation pour découvrir les attractions et
            les sites touristiques. Il suffit d’indiquer où l’on se rend pour
            visualiser toutes activités à proximité et découvrir les meilleures
            visites guidées, les billets coupe-file et les attractions phares que vous
            réserve votre destination.
          </p>
          <ul className="mt-4 c-footer__socials">
            <li>
              <a href="">
                <i className="ri-facebook-box-fill"></i>
              </a>
            </li>
            <li>
              <a href="">
                <i className="ri-twitter-fill"></i>
              </a>
            </li>
            <li>
              <a href="">
                <i className="ri-instagram-line"></i>
              </a>
            </li>
            <li>
              <a href="">
                <i className="ri-linkedin-box-fill"></i>
              </a>
            </li>
          </ul>
        </div>
        {footerList.map(({ title, list }) => (
          <div key={title}>
            <h3>{title}</h3>
            <ul className="mt-8">
              {list.map(({ label, link }, index) => (
                <li className="mt-4" key={index}>
                  <ul>
                    <a className="hover-underline" href={link}>
                      {label}
                    </a>
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="c-footer__extra">
        <span>
          © 2022 <span className="u-primary-text u-fw-700">Lets Go</span> | Paris,
          France
        </span>
      </div>
    </footer>
  );
};

export default Footer;
