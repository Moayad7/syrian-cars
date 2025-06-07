import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import CarListings from "./pages/CarListings";
import Rentals from "./pages/Rentals";
import SpareParts from "./pages/SpareParts";
import KnowYourNeeds from "./pages/KnowYourNeeds";
import Login from "./pages/Login";
import CarDetails from "./pages/CarDetails";
import AddCar from "./pages/AddCar";
import UserDashboard from "./pages/UserDashboaer";
import EditCar from "./pages/EditCar";
import AdminDashboard from "./adminDashboard";
import Users from "./adminDashboard/Users";
import Cars from "./adminDashboard/Cars";
import Stores from "./adminDashboard/Stores";
import Workshops from "./pages/Workshops";
import AddWorkshop from "./pages/AddWorkshop";
import AddWorkshopAd from "./pages/AddWorkshopAd";
import WarrantyInspectionForm from "./pages/WarrantyInspectionForm";
import { CarProvider } from "./components/CarProvider";
import SearchResults from "./pages/SearchResults";
import Categories from "./adminDashboard/Catigories";
import Workshops_Admin from "./adminDashboard/Workshops_Admin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <HelmetProvider>
        <CarProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/register" element={<Register />} />
              <Route path="/car-listings" element={<CarListings />} />
              <Route path="/car/:id" element={<CarDetails />} />
              <Route path="/add-car" element={<AddCar />} />
              <Route path="/rentals" element={<Rentals />} />
              <Route path="/spare-parts" element={<SpareParts />} />
              <Route path="/workshops" element={<Workshops />} />
              <Route path="/add-workshop" element={<AddWorkshop />} />
              <Route path="/add-workshop-ad" element={<AddWorkshopAd />} />
              <Route path="/know-your-needs" element={<KnowYourNeeds />} />
              <Route path="/login" element={<Login />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="/user-dashboard" element={<UserDashboard />} />
              <Route path="/edit-car/:id" element={<EditCar />} />
              <Route path="/inspction" element={<WarrantyInspectionForm />} />
              <Route path="/searchResults" element={<SearchResults />} />
              <Route path="*" element={<NotFound />} />

              <Route path="/admin" element={<AdminDashboard />}>
                <Route path="users" element={<Users />} />
                <Route path="cars" element={<Cars />} />
                <Route path="stores" element={<Stores />} />
                <Route path="categories" element={<Categories />} />
                <Route path="workshops" element={<Workshops_Admin />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CarProvider>
      </HelmetProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
