import React, { useState, useEffect } from 'react';
import { Plus, TrendingUp, TrendingDown, MoreHorizontal, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

interface CountryData {
  name: string;
  rise: boolean;
  value: number;
  id: number;
}

export const TopCountries: React.FC = () => {
  const [countryData, setCountryData] = useState<CountryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountryData = async () => {
      setLoading(true);
      try {
        // In a real app, you would have a countries table with stats
        // Here we'll simulate by querying admin_users and generating stats
        
        // First check if we have a countries table
        const { data: countriesExists } = await supabase
          .from('information_schema.tables')
          .select('table_name')
          .eq('table_name', 'countries')
          .single();
          
        if (countriesExists) {
          // If we have a countries table, use it
          const { data, error } = await supabase
            .from('countries')
            .select('*')
            .order('value', { ascending: false })
            .limit(4);
            
          if (error) throw error;
          if (data && data.length > 0) {
            setCountryData(data.map((country, index) => ({
              ...country,
              id: index + 1
            })));
            setLoading(false);
            return;
          }
        }
        
        // If no countries table or no data, generate mock data
        // but use real user count as a base for the values
        const { count: userCount } = await supabase
          .from('admin_users')
          .select('*', { count: 'exact', head: true });
          
        const baseValue = (userCount || 1) * 5000;
        
        const mockCountries = [
          { name: 'USA', rise: true, value: baseValue + Math.random() * 10000, id: 1 },
          { name: 'Ireland', rise: false, value: baseValue * 0.9 + Math.random() * 8000, id: 2 },
          { name: 'Ukraine', rise: false, value: baseValue * 0.6 + Math.random() * 5000, id: 3 },
          { name: 'Sweden', rise: true, value: baseValue * 0.45 + Math.random() * 3000, id: 4 },
        ];
        
        setCountryData(mockCountries);
      } catch (err) {
        console.error('Error fetching country data:', err);
        setError('Failed to load country data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCountryData();
  }, []);

  const getCountryFlag = (id: number) => {
    const flags = ['🇺🇸', '🇮🇪', '🇺🇦', '🇸🇪'];
    return flags[id - 1] || '🌍';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="animate-spin text-gray-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex p-4 flex-col h-full">
      <div className="flex justify-between items-center">
        <div className="text-white font-bold">Top Regions</div>
        <Plus className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
      </div>
      <div className="text-gray-400 text-sm">Client distribution</div>
      
      {countryData.map(({ name, rise, value, id }) => (
        <div className="flex items-center mt-3" key={id}>
          <div className="text-gray-400 text-sm w-4">{id}</div>
          <div className="ml-2 text-xl">{getCountryFlag(id)}</div>
          <div className="ml-2 text-white">{name}</div>
          <div className="flex-grow" />
          <div className="text-white">{`$${value.toLocaleString(undefined, {maximumFractionDigits: 2})}`}</div>
          {rise ? (
            <TrendingUp className="w-4 h-4 mx-3 text-green-500" />
          ) : (
            <TrendingDown className="w-4 h-4 mx-3 text-red-500" />
          )}
          <MoreHorizontal className="w-4 h-4 text-gray-400 cursor-pointer" />
        </div>
      ))}
      
      <div className="flex-grow" />
      <div className="flex justify-center">
        <button className="text-blue-400 hover:text-blue-300 text-sm">Check All</button>
      </div>
    </div>
  );
};
