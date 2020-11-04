// The link to the json file.
const endpoint = "https://gist.githubusercontent.com/raman08/2394b9ba8f34424235d647c915a74224/raw/a5a252154e6bfc490c86774bf0f4d5d8f82a11f5/indian_state_population.json";

// Array that will contain the cities
const cities = [];


// Required DOM Element.
const input_field = document.querySelector('.search');
const suggestion = document.querySelector('.suggestion');


// fetching the link and then putting the json object into cities array.
fetch(endpoint)
	.then(blob => blob.json())
	.then(data => cities.push(...data));


// The function to return the array of cities that matched the given word.
function chopData(search_text, cities) {

	//  Regex to match the distict or state with the serach_text
	const regex = new RegExp(search_text, 'gi');

	// Returnig the array that contains the serach result
	return cities.filter(place => {
		return place.District.match(regex) || place.State.match(regex);
	});
}

// The function to place commas to the population.
function number_with_commas(num) {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Function to display maches.
function displayMaches() {

	// Getting the data
	const match_data = chopData(this.value, cities);

	// Conveting the data into required form.
	const html = match_data.map(place => {

		const regex = new RegExp(this.value, 'gi');

		const distict_name = place.District.replace(regex, '<span class="hl">' + this.value + '</span>');

		const state_name = place.State.replace(regex, '<span class="hl">' + this.value + '</span>');

		let population = number_with_commas(place.Population);

		if(population === ''){
			population = 'N/A';
		}

		return `

		<li>
		<span class="name">${distict_name}, ${state_name}</span>

		<span class="population">${population}</span>

		`;
	}).join('');

	// Placing the data into dom.
	suggestion.innerHTML = html;

	// If input field is empty then make suggstion empty.
	if (this.value == '') {
		suggestion.innerHTML = '';
	}

}

// Event listener to find when inpit is entered.
input_field.addEventListener('change', displayMaches);
input_field.addEventListener('keyup', displayMaches);

