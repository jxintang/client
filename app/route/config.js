/**
 * @Author: tangjingxin <jxintang>
 * @Date:   03/20/2017
 * @Email:  jxintang@gmail.com
 * @Last modified by:   tangduck
 * @Last modified timine: 03/26/2017
 */

import React from 'react';
import createHistory from 'history/createBrowserHistory';
import { observable,action } from 'mobx';
import navState from '../mobx/NavState';

import Setting from './setting/Index.jsx';
import NewsInfo from './news/Info.jsx';
import News from './news/Index.jsx';
import PolicyArticle from './news/PolicyArticle.jsx';
import RealStuff from './news/RealStuff.jsx';
import NewsReport from './news/Report.jsx';
import ContentDetail from './news/ContentDetail.jsx';
import Trends from './bond/Trends.jsx';
import BondValuation from './bond/CreditorValuation.jsx';
import RateChange from './bond/change/RateChange.jsx';
import MainRelease from './bond/MainRelease.jsx';
import RateChangeResults from './bond/change/Results.jsx';
import RateChangeResultsByID from './bond/change/ResultsById.jsx';
import Bond from './bond/Index.jsx';
import BondDetail from './bond/Detail.jsx';
import BondInterest from './bond/Interest.jsx';
import BondFind from './bond/find/Find.jsx';
import BondResults from './bond/find/Results.jsx';
import BondLikeList from './bond/LikeList.jsx';
import Disclosure from './disclosure/Index.jsx';
import DisclosureList from './disclosure/List.jsx';
import DisclosureItemList from './disclosure/ItemList.jsx';
import DisclosureLawList from './disclosure/LawList.jsx';
import DisclosureRegularList from './disclosure/RegularList.jsx';
import DisclosureProvisionalList from './disclosure/ProvisionalList.jsx';
import SettingRules from './setting/Rules.jsx';
import SettingNotifications from './setting/Notifications.jsx';
import Calendar from './setting/Calendar.jsx';
import CalendarDetail from './setting/CalendarDetail.jsx';
import MyTable from './setting/MyTable.jsx';
import Mine from './mine/Index.jsx';
import MineList from './mine/List.jsx';
import MineDetail from './mine/Detail.jsx';
import MyArticle from './mine/Article.jsx';
import MinessageList from './mine/MessageList.jsx';
import CreditorList from './mine/CreditorList.jsx';
import InfoUpload from './mine/InfoUpload.jsx';
import FeedBack from './mine/FeedBack.jsx';
import ChangePhone from './mine/ChangePhone.jsx';
import AuthCard from './mine/AuthCard.jsx';
import Company from './company/Index.jsx';
import CompanyActivity from './company/Activity.jsx';
import CompanyActivityDetail from './company/ActivityDetail.jsx';
import CompanyNewBond from './company/NewBondList.jsx';
import CompanyNewBondDetail from './company/NewBondDetail.jsx';
import CompanyCampaign from './company/Campaign.jsx';
import CompanyList from './company/CompanyList.jsx';
import CompanyDetail from './company/CompanyDetail.jsx';
import CompanyBusinessScope from './company/CompanyBusinessScope.jsx';
import CompanyShareHolders from './company/CompanyShareHolders.jsx';
import ContentView from './content/ContentView.jsx';
import Login from './auth/Login.jsx';
import Jump from './auth/Jump.jsx';
import Nav from '../container/Nav.jsx';
import Nav1 from '../container/Nav1.jsx';
import TabBar from '../container/TabBar.jsx';
import {NAV_NEWS_LIST,NAV_BOND_LIST,NAV_COMPANY_LIST} from './const';

const history = createHistory();

export default [
    {
		path : '/news',
		component : News,
		sidebar:() => <Nav title="news"/>,
        routes : [
            {
				path: '/news/info',
				component: NewsInfo,
				sidebar:() => <Nav title="新闻资讯" list={NAV_NEWS_LIST} />,
                tabbar:() => <TabBar />,
			},
			{
				path: '/news/policy-article',
				component: PolicyArticle,
				sidebar:() => <Nav title="政策新闻" list={NAV_NEWS_LIST} />,
                tabbar:() => <TabBar />,
			}, {
				path: '/news/real-stuff',
				component: RealStuff,
				sidebar:() => <Nav title="干货分享" list={NAV_NEWS_LIST} />,
                tabbar:() => <TabBar />,
			},  {
				path: '/news/content-detail',
				component: ContentDetail,
				sidebar:() => <Nav1 title="文章详情" />
			},  {
				path: '/news/report',
				component: NewsReport,
				sidebar:() => <Nav title="研究报告" list={NAV_NEWS_LIST} />,
                tabbar:() => <TabBar />,
			}
		]
	},
    {
		path : '/bond',
		component : Bond,
		sidebar:() => <Nav1 title="查找债券"/>,
        routes: [
            {
				path: '/bond/rate-change',
				component: RateChange,
				sidebar:() => <Nav title="评级变动" history={history} list={NAV_BOND_LIST} />,
                tabbar:() => <TabBar />,
			},
            {
				path: '/bond/creditor-valuation',
				component: BondValuation,
				sidebar:() => <Nav title="债券估值" list={NAV_BOND_LIST} />,
                tabbar:() => <TabBar />,
			},
            {
               path: '/bond/main-release',
               component: MainRelease,
               sidebar:() => <Nav title="一级发行" list={NAV_BOND_LIST} />,
               tabbar:() => <TabBar />,
           },
           {
               path: '/bond/change/results-by-id',
               component: RateChangeResultsByID,
               sidebar:() => <Nav1 title="发行人所有债券" list={NAV_BOND_LIST} />
           },
           {
               path: '/bond/change/results',
               component: RateChangeResults,
               sidebar:() => <Nav1 title="搜索结果" />
           },
           {
               path: '/bond/history-trends',
               component: Trends,
               sidebar:() => <Nav1 title="历史趋势" />,
           },
            {
                path: '/bond/detail',
                component: BondDetail,
                sidebar:() => <Nav1 title="债券详情" right={[{
                    title:['关注','取消关注']
                }]}/>,
            },
            {
                path: '/bond/interest',
                component: BondInterest,
                sidebar:() => <Nav1 title="付息" />,
            },
            {
                path: '/bond/find',
                component: BondFind,
                sidebar:() => <Nav title="查找债券" list={NAV_BOND_LIST}/>,
                tabbar:() => <TabBar />,
            },
            {
                path: '/bond/results',
                component: BondResults,
                sidebar:() => <Nav1 title="筛选结果" />,
                tabbar:() => <TabBar />,
            },
            {
                path: '/bond/like-list',
                component: BondLikeList,
                sidebar:() => <Nav1 title="猜你喜欢" />,
                tabbar:() => <TabBar />,
            },
        ]
	},
    {
		path : '/disclosure',
		component : Disclosure,
		sidebar:() => <Nav1 title="设置"/>,
        routes: [
            {
                path: '/disclosure/list',
                component: DisclosureList,
                sidebar:() => <Nav1 title="信息披露" />,
                tabbar:() => <TabBar />,
            },
            {
                path: '/disclosure/item-list',
                component: DisclosureItemList,
                sidebar:() => <Nav1 title="上交所公募公司债" />,
            },
            {
                path: '/disclosure/law-list',
                component: DisclosureLawList,
                sidebar:() => <Nav1 title="法律法规条目" />,
            },
            {
                path: '/disclosure/regular-list',
                component: DisclosureRegularList,
                sidebar:() => <Nav1 title="定期报告条目" />,
            },
            {
                path: '/disclosure/provisional-list',
                component: DisclosureProvisionalList,
                sidebar:() => <Nav1 title="临时报告条目" />,
            },
        ]
	},
	{
		path : '/setting',
		component : Setting,
		sidebar:() => <Nav1 title="设置"/>,
        routes: [
            {
                path: '/setting/rules',
                component: SettingRules,
                sidebar:() => <Nav1 title="设置提醒规则" />,
            },
            {
                path: '/setting/notifications',
                component: SettingNotifications,
                sidebar:() => <Nav1 title="消息提醒" />,
            },
            {
                path: '/setting/calendar',
                component: Calendar,
                sidebar:() => <Nav1 title="日历" />,
            },
            {
                path: '/setting/calendar-detail',
                component: CalendarDetail,
                sidebar:() => <Nav1 title="关注日历" right={[{
                    title:'查看全年概况',
                    event:()=>{this.props.history.pop()},
                    icon:'' // icon类名
                }]} />,
            },
            {
                path: '/setting/aaa',
                component: MyTable,
                sidebar:() => <Nav1 title="表格" />,
            },
        ]
	},
	{
		path : '/mine',
		component : Mine,
		sidebar:() => <Nav title="我"/>,
        routes: [
            {
                path: '/mine/list',
                component: MineList,
                sidebar:() => <Nav1 title="我" />,
                tabbar:() => <TabBar />,
            },
            {
                path: '/mine/detail',
                component: MineDetail,
                sidebar:() => <Nav1 title="认证信息" />,
            },
            {
                path: '/mine/minessage',
                component: MinessageList,
                sidebar:() => <Nav1 title="认证信息" />,
            },
            {
                path: '/mine/creditor-list',
                component: CreditorList,
                sidebar:() => <Nav1 title="我的债券" right={[{
                    title:['编辑','取消'],
                    icon:'' // icon类名
                },{
                    icon:'calendar-icon', // icon类名
                    path: '/setting/calendar?uri=/mybond/calendar'
                }]}/>,
            },
            {
                path: '/mine/article',
                component: MyArticle,
                sidebar:() => <Nav1 title="我的收藏" />
            },
            {
                path: '/mine/info-upload',
                component: InfoUpload,
                sidebar:() => <Nav1 title="上传名片" />
            },
            {
                path: '/mine/feedback',
                component: FeedBack,
                sidebar:() => <Nav1 title="咨询客服" />
            },
            {
                path: '/mine/change-phone',
                component: ChangePhone,
                sidebar:() => <Nav1 title="修改手机号" />
            },
            {
                path: '/mine/auth-card',
                component: AuthCard,
                sidebar:() => <Nav1 title="重新认证" />
            }
        ]
	},
	{
		path : '/company1',
		component : Company,
		sidebar:() => <Nav title="公司"/>,
        routes: [
            {
                path: '/company1/activity',
                component: CompanyActivity,
                sidebar:() => <Nav title="固收活动" list={NAV_COMPANY_LIST}/>,
                tabbar:() => <TabBar />,
            },
            {
                path: '/company1/activity-detail',
                component: CompanyActivityDetail,
                sidebar:() => <Nav1 title="活动详情" />,
                tabbar:() => <TabBar />,
            },
            {
                path: '/company1/newbond',
                component: CompanyNewBond,
                sidebar:() => <Nav title="新债推荐" list={NAV_COMPANY_LIST} />,
                tabbar:() => <TabBar />,
            },
            {
                path: '/company1/newbond-detail',
                component: CompanyNewBondDetail,
                sidebar:() => <Nav1 title="债券详情" />
            },
            {
                path: '/company1/campaign',
                component: CompanyCampaign,
                sidebar:() => <Nav title="查找企业" list={NAV_COMPANY_LIST} />,
                tabbar:() => <TabBar />
            },
            {
                path: '/company1/list',
                component: CompanyList,
                sidebar:() => <Nav1 title="查找企业" />
            },
            {
                path: '/company1/detail',
                component: CompanyDetail,
                sidebar:() => <Nav1 title="企业详情" />
            },
            {
                path: '/company1/business-scope',
                component: CompanyBusinessScope,
                sidebar:() => <Nav1 title="经营范围" />
            },
            {
                path: '/company1/business-shareholders',
                component: CompanyShareHolders,
                sidebar:() => <Nav1 title="股权结构" />
            },
        ]
	},
    {
		path : '/content/view',
		component : ContentView,
		sidebar:() => <Nav1 title="详情页"/>
	},
    {
		path : '/auth/login',
		component : Login,
		sidebar:() => <Nav1 title="登录"/>
	},
    {
		path : '/auth/jump',
		component : Jump,
		sidebar:() => <Nav1 title="跳转提示"/>
	}
]
