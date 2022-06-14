// STRETCH
const cars = [
    {
        vin: 'ZAMGJ45A480037578',
        make: 'Ford',
        model: 'Focus',
        mileage: 21000,
        title: 'clean',
        transmission: 'automatic'
    },

    {
        vin: 'JH4KA4660KC003974',
        make: 'Dodge',
        model: 'Charger',
        mileage: 9000,
        title: 'salvage',
        transmission: 'manual'
    },

    {
        vin: '1HD1PDC392Y952267',
        make: 'Kia',
        model: 'Spectra',
        mileage: 192000
    }
];

exports.seed = async function (knex) {
    await knex('cars').truncate();
    await knex('cars').insert(cars);
};