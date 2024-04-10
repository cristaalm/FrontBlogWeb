import React, { useState } from 'react';
import "../../css/cuerpo.css"
import { Tooltip } from "react-tooltip"; // 1. Debemos de importar Tooltip
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { FormattedMessage } from "react-intl";
import { useIntl } from 'react-intl'; //importas esto para poder poner la traduccion en los tooltips

import {
    ListCollapse,
    Grid2X2 
} from "lucide-react";

const Cuerpo =() => {
    
    const [viewMode, setViewMode] = useState('lista'); // Estado para manejar la vista de los elementos (lista o cuadrícula)

    // Función para cambiar a la vista de lista
    const changeToListView = () => {
        setViewMode('lista');
    };
    // Función para cambiar a la vista de cuadrícula
    const changeToGridView = () => {
        setViewMode('cuadricula');
    };

    const intl = useIntl();

  // Usa intl.formatMessage para obtener los textos de los tooltips
    const listViewTooltip = intl.formatMessage({ id: 'iTndex.list', defaultMessage: 'List' });
    const gridViewTooltip = intl.formatMessage({ id: 'index.grid', defaultMessage: 'Grid' });

    return (
    <div className="cuerpoo">
        {/* Video destacado */}
        <article id='welcome' className="seccionesvideo">
            <video className="vid" src="src/video/aquavision.mp4" autoPlay loop muted></video>
            <div className='vajovideo'></div>
        </article>

        {/* Top de categorías */}
        <article className="seccionescuerpo">
            <div className=" titulosdecategoruas">
                <FormattedMessage id="index.Top-categories" defaultMessage="Top categories"  />
            </div>
            <div className="tutilocatego">
                <div className="imagendest">
                    <img className="imgdest"  src="../../../public/img/img5.png" alt="" />
                </div>
                <div className="textodecategorias">Categoría <br/> # Entradas</div>
            </div>
            <div className="tutilocatego2">
                <div className="imagendest">
                    <img className="imgdest"  src="../../../public/img/img5.png" alt="" />
                </div>
                <div className="textodecategorias">Categoría <br/> # Entradas</div>
            </div>
            <div className="tutilocatego3">
                <div className="imagendest">
                    <img className="imgdest"  src="../../../public/img/img5.png" alt="" />
                </div>
                <div className="textodecategorias">Categoría <br/> # Entradas</div>
            </div>
        </article>
        {/* Últimas entradas */}
        <article id='ultima-entrada' className="seccionescuerpoultima">
            <div className={`ultimasentradas-container titulosdecategoruas ${viewMode}`}>
                <FormattedMessage id="index.Last-entries" defaultMessage="Last entries"  />
                <div className='contenedorbotoneslistacuad'>
                    <Tooltip
                    id="lista"
                    style={{
                        backgroundColor: "#034077",
                        color: "whitesmoke",
                        zIndex: "999",
                    }}
                    />
                    <Tooltip
                    id="cuadricular"
                    style={{
                        backgroundColor: "#034077",
                        color: "whitesmoke",
                        zIndex: "999",
                    }}
                    />
                    <ButtonGroup variant="contained" >
                        <Button 
                        onClick={changeToListView}
                        data-tooltip-id="lista"
                        data-tooltip-place="top"
                        data-tooltip-content=   {listViewTooltip} //implementas la funcion aqui
                        >
                            <ListCollapse /> 
                        </Button>
                        <Button
                        onClick={changeToGridView}
                        data-tooltip-id="cuadricular"
                        data-tooltip-place="top"
                        data-tooltip-content=   {gridViewTooltip}   //implementas la funcion aqui
                        >
                            <Grid2X2 /> 
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
            <div className={`ultimasentradas-container ${viewMode === 'lista' ? 'lista-view' : ''}`}>
                    <div className={`ultimasentradas ${viewMode === 'lista' ? 'lista-view' : ''}`}>
                        <div className={`categoria-seleccionada ${viewMode === 'lista' ? 'lista-view' : ''}`}>
                            <img className={`catimg ${viewMode === 'lista' ? 'lista-view' : ''}`} src="../../../public/img/img5.png" alt="" />
                        </div>
                        <div className="contenido-entrada">
                            <div className={`metaentrada ${viewMode === 'lista' ? 'lista-view' : ''}`}>Nombre del creador - Fecha de publicación</div>
                            <div className={`tituloentrada ${viewMode === 'lista' ? 'lista-view' : ''}`}>Título de Entrada</div>
                            <div className={`descripcionentrada ${viewMode === 'lista' ? 'lista-view' : ''}`}>Descripción</div>
                        </div>
                    </div>
                    <div className={`ultimasentradas ${viewMode === 'lista' ? 'lista-view' : ''}`}>
                        <div className={`categoria-seleccionada ${viewMode === 'lista' ? 'lista-view' : ''}`}>
                            <img className={`catimg ${viewMode === 'lista' ? 'lista-view' : ''}`} src="../../../public/img/img5.png" alt="" />
                        </div>
                        <div className="contenido-entrada">
                            <div className={`metaentrada ${viewMode === 'lista' ? 'lista-view' : ''}`}>Nombre del creador - Fecha de publicación</div>
                            <div className={`tituloentrada ${viewMode === 'lista' ? 'lista-view' : ''}`}>Título de Entrada</div>
                            <div className={`descripcionentrada ${viewMode === 'lista' ? 'lista-view' : ''}`}>Descripción</div>
                        </div>
                    </div>
                    <div className={`ultimasentradas ${viewMode === 'lista' ? 'lista-view' : ''}`}>
                        <div className={`categoria-seleccionada ${viewMode === 'lista' ? 'lista-view' : ''}`}>
                            <img className={`catimg ${viewMode === 'lista' ? 'lista-view' : ''}`} src="../../../public/img/img5.png" alt="" />
                        </div>
                        <div className="contenido-entrada">
                            <div className={`metaentrada ${viewMode === 'lista' ? 'lista-view' : ''}`}>Nombre del creador - Fecha de publicación</div>
                            <div className={`tituloentrada ${viewMode === 'lista' ? 'lista-view' : ''}`}>Título de Entrada</div>
                            <div className={`descripcionentrada ${viewMode === 'lista' ? 'lista-view' : ''}`}>Descripción</div>
                        </div>
                    </div>
                </div>
                <div className='mosrarmasyvav'>
                <ButtonGroup variant="contained" aria-label="Basic button group">
                    <Button>1</Button>
                    <Button>2</Button>
                    <Button>3</Button>
                </ButtonGroup>
                    <button className='mostarmas'> mostar mas</button>
                </div>
        </article>



        {/* Recursos Multimedia */}
        <article id="recursos-multimedia" className="seccionescuerporecursos">
        <div className=" titulosdecategoruasbla">
            <FormattedMessage id="index.Multimedia-Resources" defaultMessage="Multimedia Resources" /> 
            </div>
            <div className="recurso">
                <div className="imagen-recurso">
                <video className="video-recursos" src="src/video/ODS6.mp4" autoPlay loop muted></video>
                </div>
            </div>
            <div className="recurso">
                <div className="imagen-recurso"></div>
            </div>
            <div className="recurso">
                <div className="imagen-recurso">
                    <video className="video-recursos" src="src/video/text.mp4" autoPlay loop muted></video>
                </div>
            </div>
        </article>

        {/* Quizz */}
        <article id='quizz' className="seccionescuerpoquizz">
        <div className=" titulosdecategoruas">
        <FormattedMessage id="index.quizz" defaultMessage="Quizz" /> 
            </div>
            <div className="contenedor-quizz">
                <div className="logo-quizz">
                    <img src="../../../public/img/quizz.png" alt="" />
                </div>  
                <button className="boton-quizz" onClick={() => window.open("/quizz", "_blank")}>Presiona para empezar</button>
            </div>
        </article>
    </div>
    );
}

export default Cuerpo