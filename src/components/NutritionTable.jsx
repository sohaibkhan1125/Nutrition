import React from 'react';

const NutritionTable = ({ data, noResults }) => {

  if (noResults) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 6.291A7.962 7.962 0 0012 5c-2.34 0-4.29 1.009-5.824 2.709" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No dishes found</h3>
        <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 overflow-hidden" id="nutrition-table" role="region" aria-label="Nutrition information table">
      {/* Mobile Card Layout */}
      <div className="block md:hidden" role="list" aria-label="Nutrition information cards">
        {data.map((item, index) => (
          <article 
            key={`${item.name}-${index}`}
            className={`p-4 border-b border-gray-100 last:border-b-0 ${
              index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
            }`}
            role="listitem"
            itemScope
            itemType="https://schema.org/NutritionInformation"
          >
            <header className="mb-3">
              <h3 className="text-base font-semibold text-gray-900 mb-1" itemProp="name">{item.name}</h3>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full" itemProp="category">
                {item.category}
              </span>
            </header>
            
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">Serving Size</div>
                <div className="text-sm font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded" itemProp="servingSize">
                  {item.servingSize} oz
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">Calories</div>
                <div className="text-lg font-bold text-red-600 bg-red-50 px-2 py-1 rounded" itemProp="calories">
                  {item.calories}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-2 mb-3">
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">Protein</div>
                <div className="text-sm font-semibold text-blue-600 bg-blue-50 px-1 py-1 rounded" itemProp="proteinContent">
                  {item.protein}g
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">Carbs</div>
                <div className="text-sm font-semibold text-orange-600 bg-orange-50 px-1 py-1 rounded" itemProp="carbohydrateContent">
                  {item.carbs}g
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">Sugars</div>
                <div className="text-sm font-semibold text-yellow-600 bg-yellow-50 px-1 py-1 rounded" itemProp="sugarContent">
                  {item.sugars}g
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">Fat</div>
                <div className="text-sm font-semibold text-purple-600 bg-purple-50 px-1 py-1 rounded" itemProp="fatContent">
                  {item.totalFat}g
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                item.allergens === 'None' 
                  ? 'bg-green-100 text-green-800 border border-green-200' 
                  : item.allergens === ''
                  ? 'bg-gray-100 text-gray-600 border border-gray-200'
                  : 'bg-red-100 text-red-800 border border-red-200'
              }`} itemProp="allergens">
                {item.allergens || 'Not specified'}
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-gradient-to-r from-red-600 to-red-700 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Dish Name
              </th>
              <th className="px-3 py-4 text-center text-xs font-semibold text-white uppercase tracking-wider">
                Serving Size (oz)
              </th>
              <th className="px-3 py-4 text-center text-xs font-semibold text-white uppercase tracking-wider">
                Calories
              </th>
              <th className="px-3 py-4 text-center text-xs font-semibold text-white uppercase tracking-wider">
                Protein (g)
              </th>
              <th className="px-3 py-4 text-center text-xs font-semibold text-white uppercase tracking-wider">
                Carbs (g)
              </th>
              <th className="px-3 py-4 text-center text-xs font-semibold text-white uppercase tracking-wider">
                Sugars (g)
              </th>
              <th className="px-3 py-4 text-center text-xs font-semibold text-white uppercase tracking-wider">
                Total Fat (g)
              </th>
              <th className="px-4 py-4 text-center text-xs font-semibold text-white uppercase tracking-wider">
                Allergens
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {data.map((item, index) => (
              <tr 
                key={`${item.name}-${index}`}
                className={`hover:bg-red-50 transition-all duration-200 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                }`}
              >
                <td className="px-4 py-4">
                  <div className="flex flex-col">
                    <div className="text-sm font-semibold text-gray-900 mb-1">{item.name}</div>
                    <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full inline-block w-fit">
                      {item.category}
                    </div>
                  </div>
                </td>
                <td className="px-3 py-4 text-center">
                  <span className="text-sm font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded">
                    {item.servingSize}
                  </span>
                </td>
                <td className="px-3 py-4 text-center">
                  <span className="text-lg font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full">
                    {item.calories}
                  </span>
                </td>
                <td className="px-3 py-4 text-center">
                  <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    {item.protein}
                  </span>
                </td>
                <td className="px-3 py-4 text-center">
                  <span className="text-sm font-semibold text-orange-600 bg-orange-50 px-2 py-1 rounded">
                    {item.carbs}
                  </span>
                </td>
                <td className="px-3 py-4 text-center">
                  <span className="text-sm font-semibold text-yellow-600 bg-yellow-50 px-2 py-1 rounded">
                    {item.sugars}
                  </span>
                </td>
                <td className="px-3 py-4 text-center">
                  <span className="text-sm font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded">
                    {item.totalFat}
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                    item.allergens === 'None' 
                      ? 'bg-green-100 text-green-800 border border-green-200' 
                      : item.allergens === ''
                      ? 'bg-gray-100 text-gray-600 border border-gray-200'
                      : 'bg-red-100 text-red-800 border border-red-200'
                  }`}>
                    {item.allergens || 'Not specified'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NutritionTable;
