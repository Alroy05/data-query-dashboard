const generateMockData = () => {
  const countries = [
    'INDIA', 'CHINA', 'US', 'RUSSIA', 'JAPAN', 
    'GERMANY', 'SAUDI ARABIA', 'BRAZIL', 'UK', 'FRANCE'
  ];
  
  const years = Array.from({length: 15}, (_, i) => 2010 + i);
  
  const data = {};
  
  countries.forEach(country => {
    data[country] = {};
    let baseValue = Math.floor(Math.random() * 500) + 100;
    
    years.forEach(year => {
      // Add some yearly variation
      const variation = Math.floor(Math.random() * 100) - 50;
      data[country][year] = Math.max(100, baseValue + variation);
      
      // Slight trend increase over years
      baseValue += Math.floor(Math.random() * 20);
    });
  });
  
  return {
    countries,
    years,
    data
  };
};

export const { countries, years, data } = generateMockData();