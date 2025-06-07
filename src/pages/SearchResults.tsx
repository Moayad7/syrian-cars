import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import CarCard from "../components/CarCard";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "../components/SEO";
import axios from "../config/axiosConfig"; // Import the Axios instance
import Spinner from "@/components/ui/Spinner";
import { useCarContext } from "@/components/CarProvider";


// Define the shape of the car data
interface CarData {
  id: string;
  title?: string;
  location?: string;
  year?: number;
  price?: number;
  fuelType?: string;
  mileage?: number;
  imageUrl?: string;
  featured?: boolean;
  // Add any other relevant fields here
}

const SearchResults = () => {
  const [cars, setCars] = useState<any[]>([]);
  // const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { searchResults } = useCarContext();

  // Fetch car data based on search query
  

  return (
    <MainLayout>
      <SEO
        title="نتائج البحث عن السيارات"
        description="استعرض نتائج البحث عن السيارات المتاحة."
        canonicalUrl="/search-results"
        keywords="سيارات للبيع, سيارات مستعملة, سيارات جديدة"
      />
      <div className="container-custom py-28">
        <h1 className="heading-2 mb-6">نتائج البحث :</h1>

        

        {/* Cars Section */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-6">السيارات المتاحة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading && (
              <Spinner />
            )}
             {searchResults.length > 0 ? 
              searchResults.map((car) => (
                <CarCard
                  key={car.id}
                  id={car.id}
                  title={car.name}
                  price={car.offer.price}
                  location={car.offer.location}
                  year={car.year}
                  mileage={car.mileage}
                  fuel={car.fuel_type}
                  imageUrl={car.imageUrl}
                  featured={car.featured}
                />
              ))
          :
          <p>لا توجد نتائج مطابقة.</p>
          }
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SearchResults;
