export default function Dropdown() {
  return (
    <>
      {/* Form Elements: Select */}
      <form className="space-y-6 dark:text-gray-100">
        {/* Select Box */}
        <div className="space-y-1">
          <label htmlFor="select" className="font-medium">
            Select
          </label>
          <select
            id="select"
            name="select"
            className="block w-full rounded-lg border border-gray-200 px-3 py-2 leading-6 focus:border-blue-500 focus:ring focus:ring-blue-500/50 dark:border-gray-600 dark:bg-gray-800 dark:focus:border-blue-500"
          >
            <option>Vue.js</option>
            <option>React</option>
            <option>Angular</option>
            <option>Svelte</option>
            <option>Ember.js</option>
            <option>Meteor</option>
          </select>
        </div>
        {/* END Select Box */}
      </form>
    </>
  );
}
