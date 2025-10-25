import React from "react";

const YourNextBuild = () => {
  const buildTypes = [
    {
      title: "Modified Street Cars for Sale For Passionate Drivers",
      description: "Need customized street cars which are not in the factory specifications? One Off Autos is created by car lovers, for car lovers. In this case, it could be an augmented daily driver, evolving into a fully customized performance vehicle. We offer verified modifications that are both reliable and personal, so you can put everyone in awe whenever they see your car on the road. We scrutinize every car that we have to provide quality and transparency. And whether you're pursuing horsepower, handling, or luxury, you will find street-ready car builds that meet the demands of a driver. Browse listings, compare designs, and deal directly with sellers who know what it is like to have a customized product."
    },
    {
      title: "Modified Custom Cars",
      description: "If you are looking for automobiles that are customized to suit uniqueness and performance, you are at the right place! Customization is not a feature at One Off Autos, it is a prerequisite. Since engine swaps and body kits are shown, we have introduced suspensions and interior upgrades, which are all part of our marketplace and showcase real passion and craftsmanship. We also simplify it to browse cars by the type of mod, the kind of drive it offers and its configuration, to make sure you get what ideally fits your style of driving. You can find JDM icons, Euro tuners, American muscle, and any other scene on the custom builds, showing the best of it all."
    },
    {
      title: "Used Modified Cars for Sale",
      description: "Acquiring used modified cars to sell them should not be a greater gamble. This is why One Off Autos has a collection of used custom vehicles that you can test drive and go for it, if satisfied. Each listing is thoroughly checked for accuracy to provide the buyer with the seller's recognition. We are not like traditional car websites; we have a community of proper members where we keep a check on performance upgrades, craftsmanship, and post real descriptions. All you need is to begin your search today and get yourself a used modified car!"
    }
  ];

  return (
    <section className="py-16 bg-transparent your-next-build-sec" style={{ backgroundImage: 'url(/your-next-build-bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-8">
          {buildTypes.slice(0, 2).map((buildType, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-lg border-theme h-full z-[1]">
              <h3 className="text-xl font-bold mb-4 text-oneoffautos-blue">
                {buildType.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {buildType.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg border-theme max-w-2xl z-[1]">
            <h2 className="text-xl font-bold mb-4 text-oneoffautos-blue">
              {buildTypes[2].title}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {buildTypes[2].description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YourNextBuild;
