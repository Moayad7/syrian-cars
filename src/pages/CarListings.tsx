import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import CarCard from "../components/CarCard";
import { Search, Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SEO from "../components/SEO";
import axios from "../config/axiosConfig"; // Import the Axios instance
import Spinner from "@/components/ui/Spinner";

//carMockData
// const cars = [
//   {
//     id: "1",
//     title: 'مرسيدس بنز الفئة E',
//     year: 2023,
//     price: 40000,
//     location: 'دمشق',
//     kilometers: 5000,
//     imageUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=400',
//     fuelType: 'بنزين',
//     transmission: 'أوتوماتيك',
//     featured: true,
//   },
//   {
//     id: "2",
//     title: 'بي ام دبليو الفئة 3',
//     year: 2022,
//     price: 35000,
//     location: 'حلب',
//     kilometers: 10000,
//     imageUrl: 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&q=80&w=400',
//     fuelType: 'بنزين',
//     transmission: 'أوتوماتيك',
//     featured: false,
//   },
//   {
//     id: "3",
//     title: 'تويوتا كامري',
//     year: 2021,
//     price: 25000,
//     location: 'حمص',
//     kilometers: 15000,
//     imageUrl: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&q=80&w=400',
//     fuelType: 'هايبرد',
//     transmission: 'أوتوماتيك',
//     featured: false,
//   },
//   {
//     id: "4",
//     title: 'هوندا أكورد',
//     year: 2023,
//     price: 30000,
//     location: 'اللاذقية',
//     kilometers: 8000,
//     imageUrl: 'https://images.unsplash.com/photo-1630990325544-33020be0e6c7?auto=format&fit=crop&q=80&w=400',
//     fuelType: 'بنزين',
//     transmission: 'أوتوماتيك',
//     featured: true,
//   },
//   {
//     id: "5",
//     title: 'كيا سبورتاج',
//     year: 2022,
//     price: 28000,
//     location: 'دمشق',
//     kilometers: 12000,
//     imageUrl: 'https://images.unsplash.com/photo-1540066019607-e5f69323a8dc?auto=format&fit=crop&q=80&w=400',
//     fuelType: 'بنزين',
//     transmission: 'أوتوماتيك',
//     featured: false,
//   },
//   {
//     id: "6",
//     title: 'هيونداي توسان',
//     year: 2021,
//     price: 26000,
//     location: 'حلب',
//     kilometers: 18000,
//     imageUrl: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&q=80&w=400',
//     fuelType: 'بنزين',
//     transmission: 'أوتوماتيك',
//     featured: true,
//   }
// ];

const CarListings = () => {
  const [cars, setCars] = useState<any[]>([]);
  const [filteredCars, setFilteredCars] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  
    // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 6; // Number of cars to display per page

  // Fetch car data from the API
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("/api/cars"); // Adjust the endpoint as necessary
        setCars(response.data.data);
        setLoading(false);
        console.log(response.data.data);
      } catch (err) {
        console.error("Error fetching cars:", err);
        setError("حدث خطأ أثناء تحميل السيارات");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleFilter = () => {
    const brand = document.querySelector('select[name="carBrand"]').value;
    const pricemax = priceRange[0];
    const pricemin = priceRange[1];
    
    const fetchCars = async () => {
          try {
            const response = await axios.get(`/api/cars?price[min]=${pricemax}&price[max]=${pricemin}&brand=${brand}`); // Adjust the endpoint as necessary
            console.log(`/api/cars?price[min]=${pricemin}&price[max]=${pricemax}&brand=${brand}`)
            setCars(response.data.data);
            setLoading(false);
            console.log(response.data.data);
          } catch (err) {
            console.error("Error fetching cars:", err);
            setError("حدث خطأ أثناء تحميل السيارات");
          } finally {
            setLoading(false);
          }
        };

        fetchCars();
  }

  // Structured data for the car listings page
  const carListingsStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: cars.map((car, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Car",
        name: car.title,
        offers: {
          "@type": "Offer",
          price: car.price,
          priceCurrency: "USD",
        },
        vehicleModelDate: car.year,
        mileageFromOdometer: {
          "@type": "QuantitativeValue",
          value: car.kilometers,
          unitCode: "KMT",
        },
      },
    })),
  };

  // if (loading) {
  //   return <div>Loading...</div>; // Show loading state
  // }

  // if (error) {
  //   return <div>{error}</div>; // Show error message
  // }

  // Calculate the index of the last car on the current page
  const indexOfLastCar = currentPage * carsPerPage;
  // Calculate the index of the first car on the current page
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  // Get the current cars to display
  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);
  // Calculate total pages
  const totalPages = Math.ceil(cars.length / carsPerPage);


  return (
    <MainLayout structuredData={carListingsStructuredData}>
      <SEO
        title="تصفح السيارات المتاحة في سوريا | مركز السيارات السوري"
        description="تصفح مجموعتنا الواسعة من السيارات الجديدة والمستعملة في سوريا. مجموعة متنوعة من العلامات التجارية والموديلات والأسعار."
        canonicalUrl="/car-listings"
        keywords="سيارات للبيع في سوريا, سيارات مستعملة, سيارات جديدة, شراء سيارات"
      />
      <div className="container-custom py-28">
        <h1 className="heading-2 mb-6">تصفح السيارات المتاحة</h1>

        {/* Search and Filters Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="ابحث عن سيارة..."
                className="w-full pr-10 py-2 pl-4 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search
                className="absolute left-3 top-1 /2 transform -translate-y-1/2 text-muted-foreground"
                size={18}
              />
            </div>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={18} />
              <span>فلترة</span>
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  showFilters ? "rotate-180" : ""
                }`}
              />
            </Button>
          </div>

          {showFilters && (
            <div className="items-center grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 pt-6 border-t border-border/50">
              <div>
                <h3 className="font-medium mb-3">نطاق السعر</h3>
                <Slider
                  defaultValue={[priceRange[0], priceRange[1]]}
                  max={100000}
                  step={1000}
                  onValueChange={(value) => setPriceRange([value[0], value[1]])}
                  className="mb-2"
                  // onChange={handleFilter}
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{priceRange[0]} $</span>
                  <span>{priceRange[1]} $</span>
                </div>
              </div>

              <div>
                {/* <h3 className="font-medium mb-3">نوع الوقود</h3>
                <div className="space-y-2">
                  {["بنزين", "ديزل", "هايبرد", "كهربائي"].map((fuel) => (
                    <div
                      className="flex items-center space-x-2 rtl:space-x-reverse"
                      key={fuel}
                    >
                      <Checkbox id={`fuel-${fuel}`} name="fuel_type"/>
                      <label
                        htmlFor={`fuel-${fuel}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mr-2"
                      >
                        {fuel}
                      </label>
                    </div>
                  ))}
                </div> */}

                <select name="carBrand" className="w-full bg-white border border-input rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all">
                  <option value="">جميع الماركات</option>
                  <option value="toyota">تويوتا</option>
                  <option value="honda">هوندا</option>
                  <option value="bmw">بي إم دبليو</option>
                  <option value="mercedes">مرسيدس</option>
                  <option value="kia">كيا</option>
                </select>
              </div>

              {/* <div>
                <h3 className="font-medium mb-3">المدينة</h3>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر المدينة" />
                  </SelectTrigger>
                  <SelectContent>
                    {["دمشق", "حلب", "حمص", "اللاذقية", "طرطوس"].map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div> */}
              <div>
              <Button onClick={handleFilter}>
                ابحث
              </Button>
            </div>
            </div>
            
          )}
        </div>

        {/* Featured Cars Section */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-6">السيارات المميزة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <Spinner />
            ) : (
              cars
                .filter((car) => car.is_featured)
                .map((car) => (
                  <CarCard
                     key={car.id}
    id={car.id}
    title={car.name }
    price={car.offer.price}
    location={car.offer.location}
    year={car.year}
    mileage={car.mileage}
    fuel={car.fuel_type}
    imageUrl={car.images[0]}
    featured={car.offer.featured}
                  />
                ))
            )}
          </div>
        </div>

{/* All Cars Section */}
        <div>
          <h2 className="text-xl font-bold mb-6">جميع السيارات المتاحة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <Spinner />
            ) : (
              currentCars.map((car) => (
                <CarCard
                  key={car.id}
    id={car.id}
    title={car.name }
    price={car.offer.price}
    location={car.offer.location}
    year={car.year}
    mileage={car.mileage}
    fuel={car.fuel_type}
    imageUrl={car.images[0]}
    featured={car.offer.featured}
                />
              ))
            )}
          </div>
          {/* Pagination Controls */}
          <div className="flex justify-center mt-6">
            <Button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              السابق
            </Button>
            <span className="mx-4">
              صفحة {currentPage} من {totalPages}
            </span>
            <Button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              التالي
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CarListings;
