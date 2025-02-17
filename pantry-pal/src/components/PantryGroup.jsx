import PropTypes from 'prop-types';

function PantryGroup({ name, numItems, imageURL}) {
    return (
        <div className="bg-orange-300 rounded-sm min-h-42 md:min-w-[240px] p-2">
            <img src={imageURL}
                 alt={name}
                 className="w-full h-32 object-cover rounded-sm" />
            <p className="font-bold">{name}</p>
            <p>Number of Unique Items: {numItems}</p>
        </div>
    );
}

// Define expected prop types
PantryGroup.propTypes = {
    name: PropTypes.string.isRequired,
    numItems: PropTypes.number.isRequired,
    imageURL: PropTypes.string.isRequired,
};

export default PantryGroup;

