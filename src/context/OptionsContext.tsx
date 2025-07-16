import React, { createContext, useContext, useState } from 'react';
import { useFetch } from "../hooks/request";
// Initial mock data (same as FormManagement)
const useVehicleOptions = () => {
  const { data: vehicle_make } = useFetch("get_vehicle_make_list", "mount", '?limit=5000');
  const { data: vehicle_model } = useFetch("get_vehicle_model_list", "mount", '?limit=5000');
  const { data: vehicle_year } = useFetch("get_vehicle_year_list", "mount", '?limit=5000');
  const { data: driver_type } = useFetch("vehicle_driver_type", "mount", '?limit=5000');
  const { data: motor_size_cylinders } = useFetch("vehicle_motor_size", "mount", '?limit=5000');
  const { data: transmition_types } = useFetch("vehicle_transmission_type", "mount", '?limit=5000');
  const { data: fuel_types } = useFetch("vehicle_fuel_type", "mount", '?limit=5000');
  const { data: seller_type } = useFetch("vehicle_seller_type", "mount", '?limit=5000');
  const { data: vehicle_status } = useFetch("vehicle_statues", "mount", '?limit=5000');
  const { data: suspension_type } = useFetch("vehicle_suspension_type", "mount", '?limit=5000');
  const { data: hp_output_rang } = useFetch("vehicle_hp_output", "mount", '?limit=5000');
  const { data: vehicle_use } = useFetch("vehicle_uses", "mount", '?limit=5000');
  const { data: documentation_type } = useFetch("vehicle_documentation_type", "mount", '?limit=5000');

  return {
    vehicle_make,
    vehicle_model,
    vehicle_year,
    driver_type,
    motor_size_cylinders,
    transmition_types,
    fuel_types,
    seller_type,
    vehicle_status,
    suspension_type,
    hp_output_rang,
    vehicle_use,
    documentation_type,
  };
};

const initialOptions = {
  vehicle_category_id: [
    { id: 1, value: 'Sedan' },
    { id: 2, value: 'SUV' },
    { id: 3, value: 'Truck' },
  ],
  vehicle_make: [
    { id: 1, value: 'Toyota' },
    { id: 2, value: 'Honda' },
    { id: 3, value: 'Ford' },
  ],
  vehicle_model: [
    { id: 1, makeId: 1, value: 'Corolla' },
    { id: 2, makeId: 1, value: 'Camry' },
    { id: 3, makeId: 2, value: 'Civic' },
    { id: 4, makeId: 3, value: 'F-150' },
  ],
  vehicle_year: [
    { id: 1, value: '2022' },
    { id: 2, value: '2023' },
    { id: 3, value: '2024' },
  ],
  exterior_color: [
    { id: 1, value: '#FF0000' },
    { id: 2, value: '#0000FF' },
    { id: 3, value: '#00FF00' },
  ],
  interior_color: [
    { id: 1, value: '#FFFFFF' },
    { id: 2, value: '#000000' },
  ],
  suspension_type: [
    { id: 1, value: 'Standard' },
    { id: 2, value: 'Sport' },
  ],
  driver_type: [
    { id: 1, value: 'FWD' },
    { id: 2, value: 'RWD' },
    { id: 3, value: 'AWD' },
  ],
  motor_size_cylinders: [
    { id: 1, value: '4' },
    { id: 2, value: '6' },
    { id: 3, value: '8' },
  ],
  transmition_types: [
    { id: 1, value: 'Automatic' },
    { id: 2, value: 'Manual' },
  ],
  fuel_types: [
    { id: 1, value: 'Gasoline' },
    { id: 2, value: 'Diesel' },
    { id: 3, value: 'Electric' },
  ],
  seller_type: [
    { id: 1, value: 'Dealer' },
    { id: 2, value: 'Private' },
  ],
  vehicle_status: [
    { id: 1, value: 'Available' },
    { id: 2, value: 'Sold' },
    { id: 3, value: 'Pending' },
  ],
  hp_output_rang: [
    { id: 1, value: '100-200' },
    { id: 2, value: '200-300' },
    { id: 3, value: '300+' },
  ],
  vehicle_use: [
    { id: 1, value: 'Personal' },
    { id: 2, value: 'Commercial' },
  ],
  documentation_type: [
    { id: 1, value: 'Title' },
    { id: 2, value: 'Bill of Sale' },
  ],
};

let nextId = 1000;

const OptionsContext = createContext<any>(null);

export const OptionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const vehicleOptions = useVehicleOptions();
console.log('check_log',vehicleOptions.vehicle_make);
  const [options, setOptions] = useState(vehicleOptions);

  // CRUD methods
  const addOption = (field: string, value: string, parentId?: number) => {
    if (field === 'vehicle_model' && parentId) {
      setOptions(prev => ({
        ...prev,
        vehicle_model: [
          ...prev.vehicle_model,
          { id: nextId++, makeId: parentId, value }
        ]
      }));
    } else {
      console.log('field................',field+' value............. '+value+' parentid........'+parentId)
      setOptions(prev => ({
        ...prev,
        [field]: [
          ...prev[field],
          { id: nextId++, value }
        ]
      }));
    }
  };

  const editOption = (field: string, id: number, value: string) => {
    setOptions(prev => ({
      ...prev,
      [field]: prev[field].map((opt: any) =>
        opt.id === id ? { ...opt, value } : opt
      )
    }));
  };

  const deleteOption = (field: string, id: number) => {
    setOptions(prev => ({
      ...prev,
      [field]: prev[field].filter((opt: any) => opt.id !== id)
    }));
  };

  return (
    <OptionsContext.Provider value={{ options, addOption, editOption, deleteOption }}>
      {children}
    </OptionsContext.Provider>
  );
};

export const useOptions = () => useContext(OptionsContext); 