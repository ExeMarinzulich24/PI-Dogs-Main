import {
    GET_DOGS,
    GET_TEMPERAMENTS,
    FILTER_BY_TEMPERAMENT,
    SORT_BY_NAME,
    FILTER_BY_ORIGIN,
    SORT_BY_WEIGHT,
    GET_DETAIL,
    DELETED_DOG,
    CLEANER,
    CLEAN_DOG,
} from "../actions"

const initialState = {
    dogs: [],
    allDogs: [],
    temperaments: [],
    detail: [],

    loader: true

}
function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload,
                detail: []

            }
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            }
        case FILTER_BY_TEMPERAMENT:
            const allDogs = state.allDogs
            const temperamentFiltered = action.payload === 'all' ? allDogs : allDogs.filter(e => {
                if (typeof (e.temperaments) === 'string') return e.temperaments.includes(action.payload)
                if (Array.isArray(e.temperaments)) {
                    let temps = e.temperaments.map(e => e.name)
                    return temps.includes(action.payload)
                }
                return true
            })
            return {
                ...state,
                dogs: temperamentFiltered
            }

        case FILTER_BY_ORIGIN:
            const all = state.allDogs
            const originFiltered = action.payload === 'all' ? all : action.payload === 'created' ? all.filter(e => e.CreatedInDB) : all.filter(e => !e.CreatedInDB)
            return {
                ...state,
                dogs: originFiltered
            }

        case SORT_BY_NAME:
            const sortedName = action.payload === 'ABC' ?
                state.dogs.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return -1;
                    }
                    return 0
                }) :
                state.dogs.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return -1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return 1;
                    }
                    return 0
                })
            return {
                ...state,
                dogs: sortedName
            }

        case SORT_BY_WEIGHT:
            const sortedWeight = action.payload === 'asc' ?
                state.dogs.sort(function (a, b) {
                    return parseInt(a.weightMin) - parseInt(b.weightMin)
                }) :
                state.dogs.sort(function (a, b) {
                    return parseInt(b.weightMax) - parseInt(a.weightMax)
                })
            return {
                ...state,
                dogs: sortedWeight,
            }

        case GET_DETAIL:
            return {
                ...state,
                detail: action.payload
            }
        case 'POST_DOGS':
            return {
                ...state,
            }
        case DELETED_DOG:
            return {
                ...state,
            }
        case CLEANER:
            return {
                ...state,
                details: {},
            };
        case CLEAN_DOG:
            return {
                ...state,
                loader: true,
            };

        default:
            return state
    }
}
export default rootReducer
