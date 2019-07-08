import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { Component } from 'react';
import { blue, blueAccent, brown, grayDarker, green, greenAccent, red, yellow, yellowAccent } from '../../style/colors';
import { CigarEntry } from '../Cigars';
import { AttrField, AttrFieldIconlist } from '../FormElements/AttrFields';
import CigarReplacement from './../../images/Cigar-replacement.svg';
import LocalStyles from './CigarCard.module.scss';

type CigarCardDisplayProps = {
    entry: CigarEntry;
    deleteFunction(id: number): void;
    edit(): void;
};

type CigarCardDisplayState = {
    expanded: boolean;
    entry: CigarEntry;
};

export class CigarCardDisplay extends Component<CigarCardDisplayProps, CigarCardDisplayState> {
    public readonly state: CigarCardDisplayState = {
        expanded: false,
        entry: this.props.entry,
    };

    public deleteCard = () => {
        this.props.deleteFunction(this.state.entry.id);
    };

    public toggleCard = () => {
        this.setState((state) => ({ expanded: !state.expanded }));
    };

    // tslint:disable-next-line: max-func-body-length
    public render() {
        const { expanded } = this.state;
        const { edit } = this.props;
        const {
            id,
            images,
            description,
            name,
            origin,
            producer,
            abbrand,
            anschnitt,
            aromarad,
            aromaentwicklung,
            aromavielfalt,
            buydate,
            deckplatt,
            einlage,
            lenght,
            ringmas,
            smokedate,
            smokeduration,
            strength,
            umblatt,
            zugwiederstand,
            rating,
            smokeagain,
        } = this.state.entry;

        return (
            <>
                <div className={classNames(LocalStyles.CigarCard, expanded && LocalStyles.Exanded)}>
                    <div className={LocalStyles.ActionSection}>
                        <button onClick={edit}>
                            <FontAwesomeIcon icon="edit" />
                        </button>
                        <button onClick={this.deleteCard}>
                            <FontAwesomeIcon icon="trash-alt" />
                        </button>
                        <button onClick={this.toggleCard}>
                            <FontAwesomeIcon icon={expanded ? 'chevron-up' : 'chevron-down'} />
                        </button>
                    </div>
                    <div className={LocalStyles.ImageSection}>
                        {images !== undefined && images.length > 0 ? (
                            <>
                                {expanded ? (
                                    images.map((img, i) => <img src={img.url} alt={img.alt} key={i} />)
                                ) : (
                                    <img src={images[0].url} alt={images[0].alt} />
                                )}
                            </>
                        ) : (
                            <div className={LocalStyles.Image}>
                                <img src={CigarReplacement} />
                            </div>
                        )}
                    </div>
                    <div className={LocalStyles.TextSection}>
                        <div className="container">
                            <div className={classNames('row', LocalStyles.row)}>
                                <h2>{name}</h2>
                                <div className="col-12 col-md-6">
                                    <AttrField color={yellow} icon="store" value={producer.name} name="Hersteller:" />
                                </div>
                                <div className="col-12 col-md-6">
                                    <AttrField
                                        color={greenAccent}
                                        icon="globe-americas"
                                        value={origin.name}
                                        name="Herkunft:"
                                    />
                                </div>
                            </div>
                            <div className={classNames('row', LocalStyles.row)}>
                                <div className="col-12 col-md-6">
                                    <AttrFieldIconlist
                                        color={red}
                                        icon="heart"
                                        value={rating}
                                        name="Gesammtbewertung:"
                                        valueIconColor={yellow}
                                        valueIcon="star"
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <AttrField
                                        color={green}
                                        icon="leaf"
                                        value={smokeagain ? 'Ja!' : 'Nein!'}
                                        name="Nochmal rauchen?"
                                    />
                                </div>
                            </div>

                            <div className={classNames('row', LocalStyles.row)}>
                                <p className={LocalStyles.Description}>
                                    <span>
                                        <FontAwesomeIcon icon="bars" size="lg" color={grayDarker} />
                                    </span>
                                    {expanded ? description : `${description.substring(0, 200)} ...`}
                                </p>
                            </div>
                            <div
                                className={classNames(
                                    LocalStyles.Details,
                                    expanded ? LocalStyles.Opend : LocalStyles.Closed
                                )}
                            >
                                <div className={classNames('row', LocalStyles.row)}>
                                    <div className="col-12 col-md-6 col-lg-4">
                                        <AttrField color={greenAccent} icon="leaf" value="Banane" name="Einlage:" />
                                    </div>
                                    <div className="col-12 col-md-6  col-lg-4">
                                        <AttrField color={greenAccent} icon="leaf" value="Banahne" name="Umblatt" />
                                    </div>
                                    <div className="col-12 col-md-6  col-lg-4">
                                        <AttrField
                                            color={greenAccent}
                                            icon="leaf"
                                            value={deckplatt.name}
                                            name="Deckblatt"
                                        />
                                    </div>
                                </div>

                                <div className={classNames('row', LocalStyles.row)}>
                                    <div className="col-12 col-md-6  col-lg-4">
                                        <AttrField color={red} icon="cut" value={anschnitt.name} name="Anschnitt:" />
                                    </div>

                                    <div className="col-12 col-md-6  col-lg-4">
                                        <AttrField color={brown} icon="ruler" value={`${lenght} cm`} name="Länge:" />
                                    </div>
                                    <div className="col-12 col-md-6  col-lg-4">
                                        <AttrField color={brown} icon="ruler" value={`${ringmas} cm`} name="Rigmaß:" />
                                    </div>
                                </div>

                                <div className={classNames('row', LocalStyles.row)}>
                                    <div className="col-12 col-md-6  col-lg-4">
                                        <AttrField
                                            color={blueAccent}
                                            icon="calendar-alt"
                                            value={buydate}
                                            name="Gekauft am:"
                                        />
                                    </div>
                                    <div className="col-12 col-md-6  col-lg-4">
                                        <AttrField
                                            color={blueAccent}
                                            icon="calendar-alt"
                                            value={smokedate}
                                            name="Geraucht am:"
                                        />
                                    </div>
                                    <div className="col-12 col-md-6  col-lg-4">
                                        <AttrField
                                            color={blueAccent}
                                            icon="clock"
                                            value={`${smokeduration} min`}
                                            name="Rauchdauer:"
                                        />
                                    </div>
                                    <div className="col-12 col-md-6  col-lg-4">
                                        <AttrField
                                            color={greenAccent}
                                            icon="leaf"
                                            value={einlage.name}
                                            name="Einlage"
                                        />
                                    </div>
                                    <div className="col-12 col-md-6  col-lg-4">
                                        <AttrField
                                            color={greenAccent}
                                            icon="leaf"
                                            value={umblatt.name}
                                            name="Umblatt"
                                        />
                                    </div>
                                </div>

                                <div className={classNames('row', LocalStyles.row)}>
                                    <div className="col-12 col-md-6  col-lg-4">
                                        <AttrFieldIconlist
                                            color={red}
                                            icon="cut"
                                            value={strength}
                                            name="Stärke:"
                                            valueIconColor={yellow}
                                            valueIcon="star"
                                        />
                                    </div>

                                    <div className="col-12 col-md-6  col-lg-4">
                                        <AttrFieldIconlist
                                            color={blue}
                                            icon="carrot"
                                            value={zugwiederstand}
                                            name="Zugwiederstand:"
                                            valueIconColor={yellow}
                                            valueIcon="star"
                                        />
                                    </div>
                                    <div className="col-12 col-md-6  col-lg-4">
                                        <AttrFieldIconlist
                                            color={blue}
                                            icon="smile-beam"
                                            value={aromavielfalt}
                                            name="Armomavielfalt:"
                                            valueIconColor={yellow}
                                            valueIcon="star"
                                        />
                                    </div>
                                </div>

                                <div className={classNames('row', LocalStyles.row)}>
                                    <div className="col-12 col-md-6  col-lg-4">
                                        <AttrFieldIconlist
                                            color={yellowAccent}
                                            icon="smile-beam"
                                            value={aromaentwicklung}
                                            name="Aromaentwicklung:"
                                            valueIconColor={yellow}
                                            valueIcon="star"
                                        />
                                    </div>
                                    <div className="col-12 col-md-6  col-lg-4">
                                        <AttrFieldIconlist
                                            color={blue}
                                            icon="ruler"
                                            value={abbrand}
                                            name="Abbrand:"
                                            valueIconColor={yellow}
                                            valueIcon="star"
                                        />
                                    </div>
                                    

                                    <div className="col-12 col-md-6  col-lg-4">
                                        <AttrField color={green} icon="cog" value={aromarad.name} name="Armomarad" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
