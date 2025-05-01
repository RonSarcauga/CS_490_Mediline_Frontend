import { useQuery } from '@tanstack/react-query';
import axios from '../assets/js/api.js';
import { specialties } from '../assets/js/const';
import FindDoctorViewModel from '../viewModels/FindDoctorViewModel';

const fetchDoctors = async () => {
    const { data } = await axios.get('/doctor/');
    console.log('Fetched data:', data);

    return data.map((doctor, i) => ({
        ...doctor,
        rating: `${80 + (i % 5) * 5}%`,
        acceptingNewPatients: i % 2 === 0
    }));
};

export const useDoctors = () => {
    const filters = FindDoctorViewModel.filters;

    return useQuery({
        queryKey: ['doctors', filters],
        queryFn: async () => {
            const doctors = await fetchDoctors();
            console.log('Fetched doctors:', doctors);

            const { name, specialty, rating, acceptingNewPatients } = filters;

            const [minRating, maxRating] = rating
                ? rating.split('-').map(r => parseFloat(r.replace('%', '')))
                : [null, null];

            const specialtyLabel = specialties.find(s => s.value === specialty)?.label;

            return doctors.filter((doctor) => {
                const doctorRating = parseFloat(doctor.rating.replace('%', ''));

                const matchesName = !name || doctor.name.toLowerCase().includes(name.toLowerCase());
                const matchesSpecialty = !specialty || doctor.specialization.toLowerCase() === specialtyLabel?.toLowerCase();
                const matchesRating = !rating || (doctorRating >= minRating && doctorRating <= maxRating);
                const matchesAcceptance = !acceptingNewPatients || doctor.acceptingNewPatients;

                return matchesName && matchesSpecialty && matchesRating && matchesAcceptance;
            });
        },
    });
};
