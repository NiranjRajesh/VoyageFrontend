import React from 'react';
import { useSearch } from '@/context/SearchContext';

const CabinClassSelector: React.FC = () => {
  const { cabinClass, updateCabinClass } = useSearch(); // Use the context values

  const cabinClasses: string[] = ["ECO", "FIRST", 'BUS'];

  const handleClassChange = (cabin: string) => {
    if (cabin === 'ALL') {
      if (cabinClass.includes(cabin)) {
        // If "All" is already selected, clear all selections
        updateCabinClass([]);
        console.log('Clear all selections');
      } else {
        // Select "All" and clear other selections
        updateCabinClass(cabinClasses); // Pass all cabin classes as an array
        console.log('Select All and clear other selections');
      }
    } else {
      // Toggle selection for the other classes
      updateCabinClass((prevSelected: string[]) => {
        if (prevSelected.includes(cabin)) {
          const updatedSelections = prevSelected.filter((cls) => cls !== cabin);
          console.log('Deselect', cabin, 'Updated Selections:', updatedSelections);
          return updatedSelections;
        } else {
          const updatedSelections = [...prevSelected, cabin];
          console.log('Select', cabin, 'Updated Selections:', updatedSelections);
          return updatedSelections;
        }
      });

      
      if (cabinClass.includes('ALL')) {
        updateCabinClass(cabinClass.filter((cls:string) => cls !== 'ALL'));
        console.log('Deselect All');
      }
    }
  };

  // Determine if "All" should be checked
  const isAllSelected =cabinClass.includes('ALL');

  return (
    <div className='cabinclass-container'>
      
      <label className='visible-checker'>
        <span className="cabin-checker"></span>
        <input
        className="invisible-checkbox"
          type="checkbox"
          checked={isAllSelected}
          onChange={() => handleClassChange('ALL')}
        />
        All
      </label>
      {cabinClasses.map((cabin) => (
        <label  className='visible-checker' key={cabin}>
        
          <input
            type="checkbox"
            className="invisible-checkbox"
            checked={cabinClass.includes(cabin)}
            onChange={() => handleClassChange(cabin)}
          />
            <span className="cabin-checker"></span>
          {cabin.toLowerCase()}
        </label>
      ))}
    </div>
  );
};

export default CabinClassSelector;
