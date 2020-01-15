import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import {
    AttrField,
    AttrFieldDescription,
    AttrFieldLikeList,
    AttrFieldSlider,
} from '../../components/FormElements/AttrFields';
import { CoffeeContext } from '../../Contexts/CoffeeContext';
import { baseURL } from '../../data';
import { CoffeeEntry } from '../../helpers/types';
import { blue, cyan, green, yellow } from '../../styles/colors';

type CoffeeCardDetailProps = {
    coffee: CoffeeEntry;
};

export const CoffeeCardDetail = ({ coffee }: CoffeeCardDetailProps) => {
    const [tab, setTab] = useState(0);

    const { goToCoffees, openBrewingWindow, editCoffeeCard, contextDeleteCoffee } = useContext(CoffeeContext);

    return (
        <>
            <div className={'WTCard'}>
                <div className="col-12">
                    <h2>{coffee.name}</h2>
                </div>
                <div className={'ActionSection'}>
                    <button onClick={() => openBrewingWindow(coffee.id)} className={'IconButton HoverGreen'}>
                        <FontAwesomeIcon icon="flask" />
                        Add brewing
                    </button>
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
                                        value={coffee.origin.name}
                                        name="Herkunft:"
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <AttrField color={yellow} icon="mug-hot" value={coffee.kind.name} name="Art:" />
                                </div>
                                <div className="col-12 col-md-6">
                                    <AttrField
                                        color={yellow}
                                        icon="flask"
                                        value={coffee.roasted.name}
                                        name="Rösterei:"
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <AttrField color={yellow} icon="leaf" value={coffee.roasted.name} name="Prozess:" />
                                </div>
                                <div className="col-12 col-md-6">
                                    <AttrField
                                        color={yellow}
                                        icon="leaf"
                                        value={coffee.roasted.name}
                                        name="Bohnenart:"
                                    />
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
                            {coffee.imageStrings &&
                                coffee.imageStrings.map((url, i) => (
                                    <>
                                        <div className={'Image'}>
                                            <img src={`${baseURL}${url}`} key={i} alt="coffee" />
                                        </div>
                                    </>
                                ))}
                        </div>
                    </>
                )}
                {tab === 3 && <></>}

                {/* <div className={'ButtonSection'}>
                    <AdvancedDeleteButton changes={false} onClick={() => deleteCoffee(coffee.id)} />
                </div> */}
            </div>
        </>
    );
};
