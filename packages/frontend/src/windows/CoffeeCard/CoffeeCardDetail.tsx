import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { useContext, useEffect, useState } from 'react';
import {
    AttrField,
    AttrFieldDescription,
    AttrFieldLikeList,
    AttrFieldSlider,
} from '../../components/FormElements/AttrFields';
import { CoffeeContext } from '../../Contexts/CoffeeContext';
import { UserContext } from '../../Contexts/UserContext';
import { baseURL } from '../../data';
import { displayDate } from '../../helpers/helperFunctions';
import { BrewingEntry, CoffeeEntry } from '../../helpers/types';
import Beans from '../../images/beans.svg';
import Cup from '../../images/cup-bw.svg';
import { throwDataError, throwDataSucess } from '../../pages/User/userHelperFunctions';
import { blue, cyan, green, yellow } from '../../styles/colors';
import { CoffeeBrewingCard } from '../BrewingCards/CoffeeBrewingCard';
import { deleteCoffeeBrewing, getCoffeeBrewings, newBrewing, saveCoffeeBrewing } from './CoffeeCardHelperFuctions';

type CoffeeCardDetailProps = {
    coffee: CoffeeEntry;
    brewing?: string;
};

export const CoffeeCardDetail = ({ coffee, brewing }: CoffeeCardDetailProps) => {
    const [tab, setTab] = useState(0);
    const [brewings, setBrewings] = useState<BrewingEntry[]>([]);
    const [selectedBrewing, setSelectedBrewing] = useState<BrewingEntry>();

    const { user } = useContext(UserContext);

    useEffect(() => {
        innerGetBrewings();
    }, [coffee]);

    useEffect(() => {
        if (brewing)
        setTab(3)
    }, [brewing]);

    const innerGetBrewings = async () => {
        try {
            const res = await getCoffeeBrewings(coffee.id);
            setBrewings(res);
        } catch(e) {
            throwDataError('Cant get brewings', e);
            throw e;
        }
    }

    const createBrewing = () => {
        const newBrewingEntry = newBrewing();
        setSelectedBrewing(newBrewingEntry);
        setBrewings((brewings) => [...brewings, newBrewingEntry]);
        //Todo: opem in edit state
    };

    // i hope this works
    const innerDeleteBrewing = async (brewing: BrewingEntry) => {
        try {
            const deletedID = await deleteCoffeeBrewing(coffee.id, brewing);
            setSelectedBrewing(undefined);
            setBrewings((brewings) => brewings.filter((brewing) => brewing.id !== deletedID));
            throwDataSucess('Brewing deleted');
        } catch (e) {
            throwDataError('Cant delete brewing', e);
            throw e;
        }
    };

    const innerSaveBrewing = async (brewing: BrewingEntry): Promise<number> => {
        try {
            const newId = await saveCoffeeBrewing(coffee.id, brewing);
            setSelectedBrewing({ ...brewing, id: newId });
            throwDataSucess('Brewing saved');
            return newId;
        } catch (e) {
            throwDataError('Cant save brewing', e);
            throw e;
        }
    };

    const { goToCoffees, editCoffeeCard, contextDeleteCoffee } = useContext(CoffeeContext);

    return (
        <>
            <div className="col-12">
                <h2>{coffee.name}</h2>
            </div>
            <div className={'ActionSection'}>
                {/* <button onClick={() => openBrewingWindow(coffee.id)} className={'IconButton HoverGreen'}>
                    <FontAwesomeIcon icon="flask" />
                    Add brewing
                </button> */}
                <button onClick={() => editCoffeeCard(coffee.id)} className={'IconButton HoverBlue'}>
                    <FontAwesomeIcon icon="edit" />
                    Edit
                </button>
                <button onClick={() => contextDeleteCoffee(coffee.id)} className={'IconButton HoverRed'}>
                    <FontAwesomeIcon icon="trash-alt" />
                    Delete
                </button>
                <button onClick={goToCoffees} className="icon-button">
                    <FontAwesomeIcon icon={'times'} />
                </button>
            </div>
            <div className={'TabBar'}>
                <ul>
                    <li className={classNames(tab === 0 && 'Active')} onClick={() => setTab(0)}>
                        Information
                    </li>
                    <li className={classNames(tab === 1 && 'Active')} onClick={() => setTab(1)}>
                        Details
                    </li>
                    <li className={classNames(tab === 2 && 'Active')} onClick={() => setTab(2)}>
                        Images
                    </li>
                    <li className={classNames(tab === 3 && 'Active')} onClick={() => setTab(3)}>
                        Bewings
                    </li>
                </ul>
            </div>
            {tab === 0 && (
                <>
                    <div className={'TextSection'}>
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <AttrField
                                    color={yellow}
                                    icon="globe-americas"
                                    value={coffee.origin}
                                    name="Herkunft:"
                                />
                            </div>
                            <div className="col-12 col-md-6">
                                <AttrField color={yellow} icon="mug-hot" value={coffee.kind} name="Art:" />
                            </div>
                            <div className="col-12 col-md-6">
                                <AttrField color={yellow} icon="flask" value={coffee.store.name} name="Rösterei:" />
                            </div>
                            <div className="col-12 col-md-6">
                                <AttrField color={yellow} icon="leaf" value={coffee.process} name="Prozess:" />
                            </div>
                            <div className="col-12 col-md-6">
                                <AttrField color={yellow} icon="leaf" value={coffee.species} name="Bohnenart:" />
                            </div>
                            <div className="col-12 col-md-6">
                                <AttrFieldLikeList value={coffee.rating} name="Gesammtbewertung:" />
                            </div>
                            <div className="col-12">
                                <AttrFieldDescription name="Beschreibung:" value={coffee.description} />
                            </div>
                        </div>
                    </div>
                </>
            )}

            {tab === 1 && (
                <>
                    <div className={'TextSection'}>
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <AttrFieldSlider color={blue} name="Geschmack:" value={coffee.taste} />
                            </div>
                            <div className="col-12 col-md-6">
                                <AttrFieldSlider color={green} name="Schokolade/Frucht:" value={coffee.tasteKind} />
                            </div>
                            <div className="col-12 col-md-6">
                                <AttrFieldSlider color={yellow} name="Säure:" value={coffee.sour} />
                            </div>
                            <div className="col-12 col-md-6">
                                <AttrFieldSlider color={green} name="Erbsig:" value={coffee.woody} />
                            </div>
                            <div className="col-12 col-md-6">
                                <AttrFieldSlider color={cyan} name="Bitter:" value={coffee.bitter} />
                            </div>
                            <div className="col-12">
                                <AttrFieldDescription name="Eigene Beschreibung" value={coffee.ownDescription} />
                            </div>
                        </div>
                    </div>
                </>
            )}

            {tab === 2 && (
                <>
                    <div className={'ImageSection'}>
                        {coffee.imageStrings && coffee.imageStrings.length > 0 ? (
                            coffee.imageStrings.map((url, i) => (
                                <>
                                    <div className={'Image'}>
                                        <img src={`${baseURL}${url}`} key={i} alt="coffee" />
                                    </div>
                                </>
                            ))
                        ) : (
                            <div className="images-replacement">No images defined</div>
                        )}
                    </div>
                </>
            )}
            {tab === 3 && (
                <>
                    <div className="container">
                        <div className="row">
                            <div className={'BrewList col-4'}>
                                <h4>Brewings</h4>
                                <ul>
                                    {brewings.length > 0 ? (
                                        brewings.map((brewing) => (
                                            <li
                                                className={classNames(
                                                    selectedBrewing && brewing.id === selectedBrewing.id && 'Active'
                                                )}
                                                onClick={() => setSelectedBrewing(brewing)}
                                            >
                                                {brewing.method}: {displayDate(brewing.brewDate)}
                                            </li>
                                        ))
                                    ) : (
                                        <li className={'NoContent'}>
                                            <img src={Cup} alt="Cup" /> no brewings
                                        </li>
                                    )}
                                </ul>
                                {user && (
                                    <button onClick={createBrewing}>
                                        <FontAwesomeIcon icon="plus" size="sm" />
                                        Add brewing
                                    </button>
                                )}
                            </div>
                            <div className={'BrewingCard col-8'}>
                                {selectedBrewing ? (
                                    <CoffeeBrewingCard
                                        brewing={selectedBrewing}
                                        key={selectedBrewing.id}
                                        saveBrewing={innerSaveBrewing}
                                        deleteBrewing={innerDeleteBrewing}
                                    />
                                ) : (
                                    <div className={'NoContent'}>
                                        <img src={Beans} alt="beans" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};
