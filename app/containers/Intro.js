import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadRules } from 'actions/questions'
import { Link } from 'react-router'
import _ from 'lodash'
import Helmet from 'react-helmet'
var Collapse = require('rc-collapse');
var Panel = Collapse.Panel;

class Intro extends Component {

    static fetchData({ store }) {
    return store.dispatch(loadRules())
  }
    constructor(){
        super();
        this._onChange = this._onChange.bind(this);
    }

  _onChange(e) {
         var rex = new RegExp(e.target.value, 'i');
        $('.panel').hide();
        $('.panel').filter(function() {
             return rex.test($(this).text());
        }).show();
  }

  componentDidMount() {
    this.props.loadRules();
    $("body").delegate('.panel-heading', "click", function(event) {
           if ($(this).next(".panel-collapse").is(":visible")) {
               $(".panel-collapse").slideUp();
           } else {
               $(".panel-collapse").slideUp();
               $(this).next(".panel-collapse").slideToggle('slow');
           }
       });
  }
  render() {
    return (
<div>
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">
                            Manage Rules
                        </h1>
                        <ol className="breadcrumb">
                            <li>
                                <i className="fa fa-dashboard"></i>  <a href="index.html">Dashboard</a>
                            </li>
                            <li className="active">
                                <i className="fa fa-file"></i> Manage Rules
                            </li>
                        </ol>
                    </div>
                </div>

                <div className="row">
                  
                    <div className="col-lg-12">
                    <input type="text" id="myInput" onChange={this._onChange} placeholder="Search Rules (Name or Rule Identifier)"/>
                          <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                                          {
                                this.props.rules.map((q)=> {
                                  let id = q.get('id')
                                  let collapse_id = 'collapse'+q.get('id');
                                  let heading_id = 'heading'+q.get('id');
                                  let collapsehashid = '#collapse'+q.get('id');
                                  return (
                                  <div key={id} className="panel panel-default">
                                    <div className="panel-heading" role="tab" id={heading_id}>
                                        <h4 className="panel-title">
                                            <a role="button" data-toggle="collapse" data-parent="#accordion" href={collapsehashid} aria-expanded="true" aria-controls={collapse_id}>
                                                <i className="more-less glyphicon glyphicon-plus"></i>{ q.get('name') }</a>
                                        </h4>
                                    </div>
                                    <div id={collapsehashid} className="panel-collapse collapse" role="tabpanel" aria-labelledby={heading_id}>
                                        <div className="panel-body">
                                        <div className="rulenumber">
                                        Rule Number{ q.get('id') }
                                        </div>
                                        <div className="rule_main">
                                          <div className="inner_main">
                                            <div className="adentifier">
                                            Rule Identifier
                                            </div>
                                            <div className="group">
                                            { q.get('identifier') }
                                            </div>
                                          </div>

                                          <div className="inner_main">
                                            <div className="adentifier">
                                            Rule Group
                                            </div>
                                            <div className="group">
                                            { q.get('group') }
                                            </div>
                                          </div>

                                          <div className="inner_main">
                                            <div className="adentifier">
                                            Sub Group
                                            </div>
                                            <div className="group">
                                            { q.get('subgroup') }
                                            </div>
                                          </div>

                                          <div className="inner_main">
                                            <div className="adentifier">
                                            Rule Name
                                            </div>
                                            <div className="group">
                                            { q.get('name') }
                                            </div>
                                          </div>

                                          <div className="inner_main">
                                            <div className="adentifier">
                                            Rule Description
                                            </div>
                                            <div className="group">
                                            { q.get('description') }
                                            </div>
                                          </div>

                                          <div className="inner_main">
                                            <div className="adentifier">
                                            Functional Area
                                            </div>
                                            <div className="group">
                                            { q.get('area') }
                                            </div>
                                          </div>

                                          
                                        </div>

                                        </div>
                                    </div>
                                </div>

                                  )
                                })
                              }
                          </div>
      </div>
      </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
    return { rules: state.questions }
}

export { Intro }

export default connect(mapStateToProps,{ loadRules })(Intro)
