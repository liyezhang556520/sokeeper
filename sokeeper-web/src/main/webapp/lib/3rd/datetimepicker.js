//Javascript name: My Date Time Picker
//Date created: 16-Nov-2003 23:19
//Scripter: TengYong Ng
//Website: http://www.rainforestnet.com
//Copyright (c) 2003 TengYong Ng
//FileName: DateTimePicker_css.js
//Version: 2.0.2
// Note: Permission given to use and modify this script in ANY kind of applications if
//       header lines are left unchanged.
//Date changed: 24-Dec-2007 by Burgsoft (Holland)
//Changed: Year picker as drop down. Code optimised. Tables filled with blank fields as needed.
//Known (non fatal) issue: javascript remains running after month or year select
//New Css style version added by Yvan Lavoie (Québec, Canada) 29-Jan-2009

//Global variables
var datetimepicker={

};
//use the Month and Weekday in your preferred language.
datetimepicker.MonthName=["01", "02", "03", "04", "05", "06","07","08", "09", "10", "11", "12"];
datetimepicker.WeekDayName1=["1","2","3","4","5","6","7"];
datetimepicker.WeekDayName2=["1","2","3","4","5","6","7"];
datetimepicker.calSpanID = "calBorder"; // span ID
datetimepicker.domStyle=null; // span DOM object with style
datetimepicker.cnLeft="0";//left coordinate of calendar span
datetimepicker.cnTop="0";//top coordinate of calendar span
datetimepicker.xpos=0; // mouse x position
datetimepicker.ypos=0; // mouse y position
datetimepicker.calHeight=0; // calendar height
datetimepicker.CalWidth=208;// calendar width
datetimepicker.CellWidth=30;// width of day cell.
datetimepicker.TimeMode=24;// TimeMode value. 12 or 24
//var WindowTitle="DateTime Picker";//Date Time Picker title.
datetimepicker.SpanBorderColor = "#cdcdcd";//span border color
datetimepicker.SpanBgColor = "#cdcdcd";//span background color
datetimepicker.WeekChar=2;//number of character for week day. if 2 then Mo,Tu,We. if 3 then Mon,Tue,Wed.
datetimepicker.DateSeparator="-";//Date Separator, you can change it to "-" if you want.
datetimepicker.ShowLongMonth=true;//Show long month name in Calendar header. example: "January".
datetimepicker.ShowMonthYear=true;//Show Month and Year in Calendar header.
datetimepicker.MonthYearColor="#cc0033";//Font Color of Month and Year in Calendar header.
datetimepicker.WeekHeadColor="#18861B";//Background Color in Week header.
datetimepicker.SundayColor="#C0F64F";//Background color of Sunday.
datetimepicker.SaturdayColor="#C0F64F";//Background color of Saturday.
datetimepicker.WeekDayColor="white";//Background color of weekdays.
datetimepicker.FontColor="blue";//color of font in Calendar day cell.
datetimepicker.TodayColor="#FFFF33";//Background color of today.
datetimepicker.SelDateColor="#8DD53C";//Backgrond color of selected date in textbox.
datetimepicker.YrSelColor="#cc0033";//color of font of Year selector.
datetimepicker.MthSelColor="#cc0033";//color of font of Month selector if "MonthSelector" is "arrow".
datetimepicker.ThemeBg="";//Background image of Calendar window.
datetimepicker.CalBgColor="";//Backgroud color of Calendar window.
datetimepicker.PrecedeZero=true;//Preceding zero [true|false]
datetimepicker.MondayFirstDay=false;//true:Use Monday as first day; false:Sunday as first day. [true|false]  //added in version 1.7
datetimepicker.UseImageFiles = true;//Use image files with "arrows" and "close" button

//end Configurable parameters
//end Global variable

// Default events configuration
// document.onmousedown = pickIt;
// document.onmousemove = dragIt;
// document.onmouseup = dropIt;

function NewCssCal(pCtrl,pFormat,pScroller,pShowTime,pTimeMode,pHideSeconds) {
	// get current date and time
	datetimepicker.dtToday = new Date();
	datetimepicker.Cal=new Calendar(datetimepicker.dtToday);

	if ((pShowTime!=null) && (pShowTime)) {
		datetimepicker.Cal.ShowTime=true;
		if ((pTimeMode!=null) &&((pTimeMode=='12')||(pTimeMode=='24')))	{
			datetimepicker.TimeMode=pTimeMode;
		}
		else datetimepicker.TimeMode='24';

        if (pHideSeconds!=null)
        {
            if (pHideSeconds)
            {datetimepicker.Cal.ShowSeconds=false;}
            else
            {datetimepicker.Cal.ShowSeconds=true;}
        }
        else
        {
            datetimepicker.Cal.ShowSeconds=false;
        }
	}
	if (pCtrl!=null)
		datetimepicker.Cal.Ctrl=pCtrl;

	if (pFormat!=null)
		datetimepicker.Cal.Format=pFormat.toUpperCase();
	else
	    datetimepicker.Cal.Format="MMDDYYYY";

	if (pScroller!=null) {
		if (pScroller.toUpperCase()=="ARROW") {
			datetimepicker.Cal.Scroller="ARROW";
		}
		else {
			datetimepicker.Cal.Scroller="DROPDOWN";
		}
    }
	datetimepicker.exDateTime=document.getElementById(pCtrl).value;

	if (datetimepicker.exDateTime!="")	{ //Parse existing Date String
		var Sp1;//Index of Date Separator 1
		var Sp2;//Index of Date Separator 2
		var tSp1;//Index of Time Separator 1
		var tSp1;//Index of Time Separator 2
		var strMonth;
		var strDate;
		var strYear;
		var intMonth;
		var YearPattern;
		var strHour;
		var strMinute;
		var strSecond;
		var winHeight;
		//parse month
		Sp1=datetimepicker.exDateTime.indexOf(datetimepicker.DateSeparator,0)
		Sp2=datetimepicker.exDateTime.indexOf(datetimepicker.DateSeparator,(parseInt(Sp1)+1));

		var offset=parseInt(datetimepicker.Cal.Format.toUpperCase().lastIndexOf("M"))-parseInt(datetimepicker.Cal.Format.toUpperCase().indexOf("M"))-1;
		if ((datetimepicker.Cal.Format.toUpperCase()=="DDMMYYYY") || (datetimepicker.Cal.Format.toUpperCase()=="DDMMMYYYY")) {
			if (datetimepicker.DateSeparator=="") {
				strMonth=datetimepicker.exDateTime.substring(2,4+offset);
				strDate=datetimepicker.exDateTime.substring(0,2);
				strYear=datetimepicker.exDateTime.substring(4+offset,8+offset);
			}
			else {
				strMonth=datetimepicker.exDateTime.substring(Sp1+1,Sp2);
				strDate=datetimepicker.exDateTime.substring(0,Sp1);
				strYear=datetimepicker.exDateTime.substring(Sp2+1,Sp2+5);
			}
		}
		else if ((datetimepicker.Cal.Format.toUpperCase()=="MMDDYYYY") || (datetimepicker.Cal.Format.toUpperCase()=="MMMDDYYYY")) {
			if (datetimepicker.DateSeparator=="") {
				strMonth=datetimepicker.exDateTime.substring(0,2+offset);
				strDate=datetimepicker.exDateTime.substring(2+offset,4+offset);
				strYear=datetimepicker.exDateTime.substring(4+offset,8+offset);
			}
			else {
				strMonth=datetimepicker.exDateTime.substring(0,Sp1);
				strDate=datetimepicker.exDateTime.substring(Sp1+1,Sp2);
				strYear=datetimepicker.exDateTime.substring(Sp2+1,Sp2+5);
			}
		}
		else if ((datetimepicker.Cal.Format.toUpperCase()=="YYYYMMDD") || (datetimepicker.Cal.Format.toUpperCase()=="YYYYMMMDD")) {
			if (datetimepicker.DateSeparator=="") {
				strMonth=datetimepicker.exDateTime.substring(4,6+offset);
				strDate=datetimepicker.exDateTime.substring(6+offset,8+offset);
				strYear=datetimepicker.exDateTime.substring(0,4);
			}
			else {
				strMonth=datetimepicker.exDateTime.substring(Sp1+1,Sp2);
				strDate=datetimepicker.exDateTime.substring(Sp2+1,Sp2+3);
				strYear=datetimepicker.exDateTime.substring(0,Sp1);
			}
		}
		if (isNaN(strMonth))
			intMonth=datetimepicker.Cal.GetMonthIndex(strMonth);
		else
			intMonth=parseInt(strMonth,10)-1;
		if ((parseInt(intMonth,10)>=0) && (parseInt(intMonth,10)<12))
			datetimepicker.Cal.Month=intMonth;
		//end parse month
		//parse Date
		if ((parseInt(strDate,10)<=datetimepicker.Cal.GetMonDays()) && (parseInt(strDate,10)>=1))
			datetimepicker.Cal.Date=strDate;
		//end parse Date
		//parse year
		YearPattern=/^\d{4}$/;
		if (YearPattern.test(strYear))
			datetimepicker.Cal.Year=parseInt(strYear,10);
		//end parse year
		//parse time
		if (datetimepicker.Cal.ShowTime==true)	{
			//parse AM or PM
			if (datetimepicker.TimeMode==12) {
				strAMPM=datetimepicker.exDateTime.substring(datetimepicker.exDateTime.length-2,datetimepicker.exDateTime.length)
				datetimepicker.Cal.AMorPM=strAMPM;
			}
			tSp1=datetimepicker.exDateTime.indexOf(":",0)
			tSp2=datetimepicker.exDateTime.indexOf(":",(parseInt(tSp1)+1));
			if (tSp1>0)	{
				strHour=datetimepicker.exDateTime.substring(tSp1,(tSp1)-2);
				datetimepicker.Cal.SetHour(strHour);
				strMinute=datetimepicker.exDateTime.substring(tSp1+1,tSp1+3);
				datetimepicker.Cal.SetMinute(strMinute);
				strSecond=datetimepicker.exDateTime.substring(tSp2+1,tSp2+3);
				datetimepicker.Cal.SetSecond(strSecond);
			}
		}
	}
	datetimepicker.selDate=new Date(datetimepicker.Cal.Year,datetimepicker.Cal.Month,datetimepicker.Cal.Date);//version 1.7
	RenderCssCal(true);
}

function RenderCssCal(bNewCal) {
	if (typeof bNewCal == "undefined" || bNewCal != true) {bNewCal = false;}
	var vCalHeader;
	var vCalData;
	var vCalTime="";
	var i;
	var j;
	var SelectStr;
	var vDayCount=0;
	var vFirstDay;
	datetimepicker.calHeight = 0; // reset the window height on refresh

	// Set the default cursor for the calendar
	winCalData="<span style='cursor:auto;'>\n";

	if (datetimepicker.ThemeBg==""){datetimepicker.CalBgColor="bgcolor='"+datetimepicker.WeekDayColor+"'"}

	vCalHeader="<table "+datetimepicker.CalBgColor+" background='"+datetimepicker.ThemeBg+"' border=1 cellpadding=1 cellspacing=1 width='200' valign='top'>\n";
	//Table for Month & Year Selector
	vCalHeader+="<tr>\n<td colspan='7'>\n<table border=0 width=200 cellpadding=0 cellspacing=0>\n<tr>\n";

	//******************Month and Year selector in dropdown list************************
	if (datetimepicker.Cal.Scroller=="DROPDOWN") {
		vCalHeader+="<td align='center'><select name=\"MonthSelector\" onChange=\"javascript:datetimepicker.Cal.SwitchMth(this.selectedIndex);RenderCssCal();\">\n";
		for (i=0;i<12;i++) {
			if (i==datetimepicker.Cal.Month)
				SelectStr="Selected";
			else
				SelectStr="";
			    vCalHeader+="<option "+SelectStr+" value="+i+">"+datetimepicker.MonthName[i]+"</option>\n";
		}
		vCalHeader+="</select></td>\n";
		//Year selector
		vCalHeader+="<td align='center'><select name=\"YearSelector\" size=\"1\" onChange=\"javascript:datetimepicker.Cal.SwitchYear(this.value);RenderCssCal();\">\n";
		for (i = 1950; i < (datetimepicker.dtToday.getFullYear() + 5);i++)	{
			if (i==datetimepicker.Cal.Year)
				SelectStr="Selected";
			else
				SelectStr="";
			vCalHeader+="<option "+SelectStr+" value="+i+">"+i+"</option>\n";
		}
		vCalHeader+="</select></td>\n";
		datetimepicker.calHeight += 30;
	}
	//******************End Month and Year selector in dropdown list*********************
	//******************Month and Year selector in arrow*********************************
	else if (datetimepicker.Cal.Scroller=="ARROW")
  {
    if (datetimepicker.UseImageFiles)
    {
  		vCalHeader+="<td><img onmousedown='javascript:datetimepicker.Cal.DecYear();RenderCssCal();' src='"+datetimepicker.images_path+"cal_fastreverse.gif' width='13' height='9' onmouseover='changeBorder(this, 0)' onmouseout='changeBorder(this, 1)' style='border:1px solid white'></td>\n";//Year scroller (decrease 1 year)
  		vCalHeader+="<td><img onmousedown='javascript:datetimepicker.Cal.DecMonth();RenderCssCal();' src='"+datetimepicker.images_path+"cal_reverse.gif' width='13' height='9' onmouseover='changeBorder(this, 0)' onmouseout='changeBorder(this, 1)' style='border:1px solid white'></td>\n";//Month scroller (decrease 1 month)
  		vCalHeader+="<td width='70%' class='calR'><font color='"+datetimepicker.YrSelColor+"'>"+datetimepicker.Cal.GetMonthName(datetimepicker.ShowLongMonth)+" "+datetimepicker.Cal.Year+"</font></td>\n"//Month and Year
  		vCalHeader+="<td><img onmousedown='javascript:datetimepicker.Cal.IncMonth();RenderCssCal();' src='"+datetimepicker.images_path+"cal_forward.gif' width='13' height='9' onmouseover='changeBorder(this, 0)' onmouseout='changeBorder(this, 1)' style='border:1px solid white'></td>\n";//Month scroller (increase 1 month)
  		vCalHeader+="<td><img onmousedown='javascript:datetimepicker.Cal.IncYear();RenderCssCal();' src='"+datetimepicker.images_path+"cal_fastforward.gif' width='13' height='9' onmouseover='changeBorder(this, 0)' onmouseout='changeBorder(this, 1)' style='border:1px solid white'></td>\n";//Year scroller (increase 1 year)
  	    datetimepicker.calHeight += 22;
	  }
	  else
	  {
	  	vCalHeader+="<td><span id='dec_year' title='reverse year' onmousedown='javascript:datetimepicker.Cal.DecYear();RenderCssCal();' onmouseover='changeBorder(this, 0)' onmouseout='changeBorder(this, 1)' style='border:1px solid white; color:"+datetimepicker.YrSelColor+"'>-</span></td>";//Year scroller (decrease 1 year)
	  	vCalHeader+="<td><span id='dec_month' title='reverse month' onmousedown='javascript:datetimepicker.Cal.DecMonth();RenderCssCal();' onmouseover='changeBorder(this, 0)' onmouseout='changeBorder(this, 1)' style='border:1px solid white'>&lt;</span></td>\n";//Month scroller (decrease 1 month)
  		vCalHeader+="<td width='70%' class='calR'><font color='"+datetimepicker.YrSelColor+"'>"+datetimepicker.Cal.GetMonthName(datetimepicker.ShowLongMonth)+" "+datetimepicker.Cal.Year+"</font></td>\n"//Month and Year
  		vCalHeader+="<td><span id='inc_month' title='forward month' onmousedown='javascript:datetimepicker.Cal.IncMonth();RenderCssCal();' onmouseover='changeBorder(this, 0)' onmouseout='changeBorder(this, 1)' style='border:1px solid white'>&gt;</span></td>\n";//Month scroller (increase 1 month)
  		vCalHeader+="<td><span id='inc_year' title='forward year' onmousedown='javascript:datetimepicker.Cal.IncYear();RenderCssCal();'  onmouseover='changeBorder(this, 0)' onmouseout='changeBorder(this, 1)' style='border:1px solid white; color:"+datetimepicker.YrSelColor+"'>+</span></td>\n";//Year scroller (increase 1 year)
  	    datetimepicker.calHeight += 22;
	  }
	}
	vCalHeader+="</tr>\n</table>\n</td>\n</tr>\n"
  //******************End Month and Year selector in arrow******************************
	//Calendar header shows Month and Year
	if ((datetimepicker.ShowMonthYear)&&(datetimepicker.Cal.Scroller=="DROPDOWN")) {
		vCalHeader+="<tr><td colspan='7' class='calR'>\n<font color='"+datetimepicker.MonthYearColor+"'>"+datetimepicker.Cal.GetMonthName(datetimepicker.ShowLongMonth)+" "+datetimepicker.Cal.Year+"</font>\n</td></tr>\n";
	    datetimepicker.calHeight += 19;
	}
	//Week day header
	vCalHeader+="<tr bgcolor="+datetimepicker.WeekHeadColor+">\n";
	var WeekDayName=new Array();//Added version 1.7
	if (datetimepicker.MondayFirstDay==true)
		WeekDayName=datetimepicker.WeekDayName2;
	else
		WeekDayName=datetimepicker.WeekDayName1;
	for (i=0;i<7;i++) {
		vCalHeader+="<td width='"+datetimepicker.CellWidth+"' class='calTD'><font color='white'>"+WeekDayName[i].substr(0,datetimepicker.WeekChar)+"</font></td>\n";
	}
	datetimepicker.calHeight += 19;
	vCalHeader+="</tr>\n";
	//Calendar detail
	CalDate=new Date(datetimepicker.Cal.Year,datetimepicker.Cal.Month);
	CalDate.setDate(1);
	vFirstDay=CalDate.getDay();
	//Added version 1.7
	if (datetimepicker.MondayFirstDay==true) {
		vFirstDay-=1;
		if (vFirstDay==-1)
			vFirstDay=6;
	}
	//Added version 1.7
	vCalData="<tr>";
	datetimepicker.calHeight += 19;
	for (i=0;i<vFirstDay;i++) {
		vCalData=vCalData+GenCell();
		vDayCount=vDayCount+1;
	}
	//Added version 1.7
	for (j=1;j<=datetimepicker.Cal.GetMonDays();j++) {
		var strCell;
		if((vDayCount%7==0)&&(j > 1)) {
			vCalData=vCalData+"\n<tr>";
		}
		vDayCount=vDayCount+1;
		if ((j==datetimepicker.dtToday.getDate())&&(datetimepicker.Cal.Month==datetimepicker.dtToday.getMonth())&&(datetimepicker.Cal.Year==datetimepicker.dtToday.getFullYear()))
			strCell=GenCell(j,true,datetimepicker.TodayColor);//Highlight today's date
		else {
			if ((j==datetimepicker.selDate.getDate())&&(datetimepicker.Cal.Month==datetimepicker.selDate.getMonth())&&(datetimepicker.Cal.Year==datetimepicker.selDate.getFullYear())) { //modified version 1.7
				strCell=GenCell(j,true,datetimepicker.SelDateColor);
			}
			else {
				if (datetimepicker.MondayFirstDay==true) {
					if (vDayCount%7==0)
						strCell=GenCell(j,false,datetimepicker.SundayColor);
					else if ((vDayCount+1)%7==0)
						strCell=GenCell(j,false,datetimepicker.SaturdayColor);
					else
						strCell=GenCell(j,null,datetimepicker.WeekDayColor);
				}
				else {
					if (vDayCount%7==0)
						strCell=GenCell(j,false,datetimepicker.SaturdayColor);
					else if ((vDayCount+6)%7==0)
						strCell=GenCell(j,false,datetimepicker.SundayColor);
					else
						strCell=GenCell(j,null,datetimepicker.WeekDayColor);
				}
			}
		}
		vCalData=vCalData+strCell;

		if((vDayCount%7==0)&&(j<datetimepicker.Cal.GetMonDays())) {
			vCalData=vCalData+"\n</tr>";
			datetimepicker.calHeight += 19;
		}
	}
	// finish the table proper
	if(!(vDayCount%7) == 0) {
		while(!(vDayCount % 7) == 0) {
			vCalData=vCalData+GenCell();
			vDayCount=vDayCount+1;
		}
	}
	vCalData=vCalData+"\n</tr>";

	//Time picker
	if (datetimepicker.Cal.ShowTime)
	{
		var showHour;
		var ShowArrows=false;
		var HourCellWidth="35px"; //cell width with seconds.
		showHour=datetimepicker.Cal.getShowHour();

		if (datetimepicker.Cal.ShowSeconds==false && datetimepicker.TimeMode==24 )
        {
		   ShowArrows=true;
		   HourCellWidth="10px";
		}

		vCalTime="\n<tr>\n<td colspan='7' align='center'><center>\n<table border='0' width='199px' cellpadding='0' cellspacing='2'>\n<tr>\n<td height='5px' width='"+HourCellWidth+"'>&nbsp;</td>\n";

		if (ShowArrows && datetimepicker.UseImageFiles)
		{
            vCalTime+="<td align='center'><table cellspacing='0' cellpadding='0' style='line-height:0pt'><tr><td><img onmousedown='javascript:datetimepicker.Cal.SetHour(datetimepicker.Cal.Hours + 1);RenderCssCal();' src='"+datetimepicker.images_path+"cal_plus.gif' width='13' height='9' onmouseover='changeBorder(this, 0)' onmouseout='changeBorder(this, 1)' style='border:1px solid white'></td></tr><tr><td><img onmousedown='javascript:datetimepicker.Cal.SetHour(datetimepicker.Cal.Hours - 1);RenderCssCal();' src='"+datetimepicker.images_path+"cal_minus.gif' width='13' height='9' onmouseover='changeBorder(this, 0)' onmouseout='changeBorder(this, 1)' style='border:1px solid white'></td></tr></table></td>\n";
		}

		vCalTime+="<td align='center' width='22px'><input type='text' name='hour' maxlength=2 size=1 style=\"WIDTH: 22px\" value="+showHour+" onChange=\"javascript:datetimepicker.Cal.SetHour(this.value)\">";
		vCalTime+="</td><td align='center'>:</td><td align='center' width='22px'>";
		vCalTime+="<input type='text' name='minute' maxlength=2 size=1 style=\"WIDTH: 22px\" value="+datetimepicker.Cal.Minutes+" onChange=\"javascript:datetimepicker.Cal.SetMinute(this.value)\">";

		if (datetimepicker.Cal.ShowSeconds) {
			vCalTime+="</td><td align='center'>:</td><td align='center' width='22px'>";
			vCalTime+="<input type='text' name='second' maxlength=2 size=1 style=\"WIDTH: 22px\" value="+datetimepicker.Cal.Seconds+" onChange=\"javascript:datetimepicker.Cal.SetSecond(parseInt(this.value,10))\">";
		}
		if (datetimepicker.TimeMode==12) {
			var SelectAm =(datetimepicker.Cal.AMorPM=="AM")? "Selected":"";
			var SelectPm =(datetimepicker.Cal.AMorPM=="PM")? "Selected":"";

            vCalTime+="</td><td>";
			vCalTime+="<select name=\"ampm\" onChange=\"javascript:datetimepicker.Cal.SetAmPm(this.options[this.selectedIndex].value);\">\n";
			vCalTime+="<option "+SelectAm+" value=\"AM\">AM</option>";
			vCalTime+="<option "+SelectPm+" value=\"PM\">PM<option>";
			vCalTime+="</select>";
		}
		if (ShowArrows && datetimepicker.UseImageFiles) {
		   vCalTime+="</td>\n<td align='center'><table cellspacing='0' cellpadding='0' style='line-height:0pt'><tr><td><img onmousedown='javascript:datetimepicker.Cal.SetMinute(parseInt(datetimepicker.Cal.Minutes,10) + 1);RenderCssCal();' src='"+datetimepicker.images_path+"cal_plus.gif' width='13px' height='9px' onmouseover='changeBorder(this, 0)' onmouseout='changeBorder(this, 1)' style='border:1px solid white'></td></tr><tr><td><img onmousedown='javascript:datetimepicker.Cal.SetMinute(parseInt(datetimepicker.Cal.Minutes,10) - 1);RenderCssCal();' src='"+datetimepicker.images_path+"cal_minus.gif' width='13px' height='9px' onmouseover='changeBorder(this, 0)' onmouseout='changeBorder(this, 1)' style='border:1px solid white'></td></tr></table>";
		}
		vCalTime+="</td>\n<td align='right' valign='bottom' width='"+HourCellWidth+"'>";

	}
	else
		{vCalTime+="\n<tr>\n<td colspan='7' align='right'>";}
	if (datetimepicker.UseImageFiles)
	{
        vCalTime+="<img onmousedown='javascript:closewin(\"" + datetimepicker.Cal.Ctrl + "\");' src='"+datetimepicker.images_path+"cal_close.gif' width='16' height='14' onmouseover='changeBorder(this, 0)' onmouseout='changeBorder(this, 1)' style='border:1px solid white'></td>";
    }
    else
    {
        vCalTime+="<span id='close_cal' title='close' onmousedown='javascript:closewin(\"" + datetimepicker.Cal.Ctrl + "\");' onmouseover='changeBorder(this, 0)' onmouseout='changeBorder(this, 1)' style='border:1px solid white; font-family: Arial;font-size: 10pt;'>x</span></td>";
    }

    vCalTime+="</tr>\n</table></center>\n</td>\n</tr>";
    datetimepicker.calHeight += 31;
	vCalTime+="\n</table>\n</span>";

    //end time picker
    var funcCalback="function callback(id, datum) {\n";
    funcCalback+=" var CalId = document.getElementById(id); CalId.value=datum;\n";
    funcCalback+=" if (datetimepicker.Cal.ShowTime) {\n";
    funcCalback+=" CalId.value+=' '+datetimepicker.Cal.getShowHour()+':'+datetimepicker.Cal.Minutes;\n";
    funcCalback+=" if (datetimepicker.Cal.ShowSeconds)\n  CalId.value+=':'+datetimepicker.Cal.Seconds;\n";
    funcCalback+=" if (datetimepicker.TimeMode==12)\n  CalId.value+=' '+datetimepicker.Cal.getShowAMorPM();\n";
    funcCalback+="}\n CalId.focus(); \n datetimepicker.winCal.style.visibility='hidden';\n}\n";

	// determines if there is enough space to open the cal above the position where it is called
	if (datetimepicker.ypos > datetimepicker.calHeight) {
	   datetimepicker.ypos = datetimepicker.ypos - datetimepicker.calHeight;
	}
	if (datetimepicker.winCal == undefined) {
	   var headID = document.getElementsByTagName("head")[0];

	   // add javascript function to the span cal
       var e = document.createElement("script");
       e.type = "text/javascript";
       e.language = "javascript";
       e.text = funcCalback;
       headID.appendChild(e);

	   // add stylesheet to the span cal
	   var cssStr = ".calTD {font-family: verdana; font-size: 12px; text-align: center;}\n";
	   cssStr+= ".calR {font-family: verdana; font-size: 12px; text-align: center; font-weight: bold; color: red;}"
	   var style = document.createElement("style");
       style.type = "text/css";
       style.rel = "stylesheet";
       if(style.styleSheet) { // IE
          style.styleSheet.cssText = cssStr;
        }
	   else { // w3c
          var cssText = document.createTextNode(cssStr);
          style.appendChild(cssText);
		}
       headID.appendChild(style);

	   // create the outer frame that allows the cal. to be moved
	   var span = document.createElement("span");
       span.id = datetimepicker.calSpanID;

	   with (span.style) {position = "absolute"; left = (datetimepicker.xpos+8)+'px'; top = (datetimepicker.ypos-8)+'px'; width = datetimepicker.CalWidth; border = "solid 2pt " + datetimepicker.SpanBorderColor; padding = "0pt"; cursor = "move"; backgroundColor = datetimepicker.SpanBgColor; zIndex = 100;}

       document.body.appendChild(span)
       datetimepicker.winCal=document.getElementById(datetimepicker.calSpanID);
    }
    else {
	  datetimepicker.winCal.style.visibility = "visible";
	  datetimepicker.winCal.style.Height = datetimepicker.calHeight;

	  // set the position for a new calendar only
	  if(bNewCal==true){
	     datetimepicker.winCal.style.left = (datetimepicker.xpos+8)+'px';
	     datetimepicker.winCal.style.top = (datetimepicker.ypos-8)+'px';
	   }
	}
	datetimepicker.winCal.innerHTML=winCalData + vCalHeader + vCalData + vCalTime;
	
	{// check we need fix the IE6.0 overlapping bug
	    var userAgent = navigator.userAgent.toLowerCase();
	    var isIE6=/msie/.test( userAgent ) && !/opera/.test( userAgent ) && /6.0/.test(navigator.userAgent);
	    if(isIE6){
	        var s ={
				top     : 'auto', // auto == .currentStyle.borderTopWidth
				left    : 'auto', // auto == .currentStyle.borderLeftWidth
				width   : 'auto', // auto == offsetWidth
				height  : 'auto', // auto == offsetHeight
				opacity : true,
				src     : 'javascript:false;'
			};
			var prop = function(n){return n&&n.constructor==Number?n+'px':n;},
			    html = '<iframe class="bgiframe"frameborder="0"tabindex="-1"src="'+s.src+'"'+
			               'style="display:block;position:absolute;z-index:-1;'+
				               (s.opacity !== false?'filter:Alpha(Opacity=\'0\');':'')+
						       'top:'+(s.top=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+\'px\')':prop(s.top))+';'+
						       'left:'+(s.left=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+\'px\')':prop(s.left))+';'+
						       'width:'+(s.width=='auto'?'expression(this.parentNode.offsetWidth+\'px\')':prop(s.width))+';'+
						       'height:'+(s.height=='auto'?'expression(this.parentNode.offsetHeight+\'px\')':prop(s.height))+';'+
						'"/>';  	
		    datetimepicker.winCal.insertBefore( document.createElement(html), datetimepicker.winCal.firstChild );
	    }
	}
	return true;
}

function GenCell(pValue,pHighLight,pColor) { //Generate table cell with value
	var PValue;
	var PCellStr;
	var vColor;
	var vHLstr1;//HighLight string
	var vHlstr2;
	var vTimeStr;

	if (pValue==null)
		PValue="";
	else
		PValue=pValue;

	if (pColor!=null)
		vColor="bgcolor=\""+pColor+"\"";
	else
		vColor=datetimepicker.CalBgColor;
	    if ((pHighLight!=null)&&(pHighLight)) {
		   vHLstr1="<font class='calR'>";vHLstr2="</font>";
		 }
	    else {
		   vHLstr1="";vHLstr2="";
		 }
	if (datetimepicker.Cal.ShowTime) {
		vTimeStr=' '+datetimepicker.Cal.Hours+':'+datetimepicker.Cal.Minutes;
		if (datetimepicker.Cal.ShowSeconds)
			vTimeStr+=':'+datetimepicker.Cal.Seconds;
		if (datetimepicker.TimeMode==12)
			vTimeStr+=' '+datetimepicker.Cal.AMorPM;
	}
	else
		vTimeStr="";
	if (PValue!="")
		PCellStr="\n<td "+vColor+" class='calTD' style='cursor: pointer;' onClick=\"javascript:callback('"+datetimepicker.Cal.Ctrl+"','"+datetimepicker.Cal.FormatDate(PValue)+"');\">"+vHLstr1+PValue+vHLstr2+"</td>";
	else
		PCellStr="\n<td "+vColor+" class='calTD'>&nbsp;</td>";
	return PCellStr;
}

function Calendar(pDate,pCtrl) {
	//Properties
	this.Date=pDate.getDate();//selected date
	this.Month=pDate.getMonth();//selected month number
	this.Year=pDate.getFullYear();//selected year in 4 digits
	this.Hours=pDate.getHours();

	if (pDate.getMinutes()<10)
		this.Minutes="0"+pDate.getMinutes();
	else
		this.Minutes=pDate.getMinutes();

	if (pDate.getSeconds()<10)
		this.Seconds="0"+pDate.getSeconds();
	else
		this.Seconds=pDate.getSeconds();

	this.MyWindow=datetimepicker.winCal;
	this.Ctrl=pCtrl;
	this.Format="ddMMyyyy";
	this.Separator=datetimepicker.DateSeparator;
	this.ShowTime=false;
	this.Scroller="DROPDOWN";
	if (pDate.getHours()<12)
		this.AMorPM="AM";
	else
		this.AMorPM="PM";
	this.ShowSeconds=true;
}

function GetMonthIndex(shortMonthName) {
	for (i=0;i<12;i++) {
		if (datetimepicker.MonthName[i].substring(0,3).toUpperCase()==shortMonthName.toUpperCase())
		   {return i;}
	}
}
Calendar.prototype.GetMonthIndex=GetMonthIndex;

function IncYear() {
	datetimepicker.Cal.Year++;}
	Calendar.prototype.IncYear=IncYear;

function DecYear() {
	datetimepicker.Cal.Year--;}
	Calendar.prototype.DecYear=DecYear;

function IncMonth() {
	datetimepicker.Cal.Month++;
	if (datetimepicker.Cal.Month>=12) {
		datetimepicker.Cal.Month=0;
		datetimepicker.Cal.IncYear();
	}
}
Calendar.prototype.IncMonth=IncMonth;

function DecMonth() {
	datetimepicker.Cal.Month--;
	if (datetimepicker.Cal.Month<0) {
		datetimepicker.Cal.Month=11;
		datetimepicker.Cal.DecYear();
	}
}
Calendar.prototype.DecMonth=DecMonth;

function SwitchMth(intMth) {
	datetimepicker.Cal.Month=intMth;}
	Calendar.prototype.SwitchMth=SwitchMth;

function SwitchYear(intYear) {
	datetimepicker.Cal.Year=intYear;}
	Calendar.prototype.SwitchYear=SwitchYear;

function SetHour(intHour) {
	var MaxHour;
	var MinHour;
	if (datetimepicker.TimeMode==24) {
		MaxHour=23;MinHour=0}
	else if (datetimepicker.TimeMode==12) {
		MaxHour=12;MinHour=1}
	else
		alert("TimeMode can only be 12 or 24");
	var HourExp=new RegExp("^\\d\\d");
	var SingleDigit=new RegExp("\\d");

	if ((HourExp.test(intHour) || SingleDigit.test(intHour)) && (parseInt(intHour,10)>MaxHour)) {
	    intHour = MinHour;
	}
	else if ((HourExp.test(intHour) || SingleDigit.test(intHour)) && (parseInt(intHour,10)<MinHour)) {
		intHour = MaxHour;
	}

	if (SingleDigit.test(intHour)) {
		intHour="0"+intHour+"";
	}

	if (HourExp.test(intHour) && (parseInt(intHour,10)<=MaxHour) && (parseInt(intHour,10)>=MinHour)) {
		if ((datetimepicker.TimeMode==12) && (datetimepicker.Cal.AMorPM=="PM")) {
			if (parseInt(intHour,10)==12)
				datetimepicker.Cal.Hours=12;
			else
				datetimepicker.Cal.Hours=parseInt(intHour,10)+12;
		}
		else if ((datetimepicker.TimeMode==12) && (datetimepicker.Cal.AMorPM=="AM")) {
			if (intHour==12)
				intHour-=12;
			datetimepicker.Cal.Hours=parseInt(intHour,10);
		}
		else if (datetimepicker.TimeMode==24)
			datetimepicker.Cal.Hours=parseInt(intHour,10);
	}
}
Calendar.prototype.SetHour=SetHour;

function SetMinute(intMin) {
	var MaxMin=59;
	var MinMin=0;
	var SingleDigit=new RegExp("\\d");
	var SingleDigit2=new RegExp("^\\d{1}$");
	var MinExp=new RegExp("^\\d{2}$");

	if ((MinExp.test(intMin) || SingleDigit.test(intMin)) && (parseInt(intMin,10)>MaxMin)) {
		intMin = MinMin;
	}
	else if ((MinExp.test(intMin) || SingleDigit.test(intMin)) && (parseInt(intMin,10)<MinMin))	{
		intMin = MaxMin;
	}
	var strMin = intMin + "";
	if (SingleDigit2.test(intMin)) {
		strMin="0"+strMin+"";
	}
	if ((MinExp.test(intMin) || SingleDigit.test(intMin))
	 && (parseInt(intMin,10)<=59) && (parseInt(intMin,10)>=0)) {
	 	datetimepicker.Cal.Minutes=strMin;
	}
}
Calendar.prototype.SetMinute=SetMinute;

function SetSecond(intSec) {
	var MaxSec=59;
	var MinSec=0;
	var SingleDigit=new RegExp("\\d");
	var SingleDigit2=new RegExp("^\\d{1}$");
	var SecExp=new RegExp("^\\d{2}$");

	if ((SecExp.test(intSec) || SingleDigit.test(intSec)) && (parseInt(intSec,10)>MaxSec)) {
		intSec = MinSec;
	}
	else if ((SecExp.test(intSec) || SingleDigit.test(intSec)) && (parseInt(intSec,10)<MinSec))	{
		intSec = MaxSec;
	}
	var strSec = intSec + "";
	if (SingleDigit2.test(intSec)) {
		strSec="0"+strSec+"";
	}
	if ((SecExp.test(intSec) || SingleDigit.test(intSec))
	 && (parseInt(intSec,10)<=59) && (parseInt(intSec,10)>=0)) {
	 	datetimepicker.Cal.Seconds=strSec;
	}
}
Calendar.prototype.SetSecond=SetSecond;

function SetAmPm(pvalue) {
	this.AMorPM=pvalue;
	if (pvalue=="PM") {
		this.Hours=(parseInt(this.Hours,10))+12;
		if (this.Hours==24)
			this.Hours=12;
	}
	else if (pvalue=="AM")
		this.Hours-=12;
}
Calendar.prototype.SetAmPm=SetAmPm;

function getShowHour() {
	var finalHour;
    if (datetimepicker.TimeMode==12) {
    	if (parseInt(this.Hours,10)==0) {
			this.AMorPM="AM";
			finalHour=parseInt(this.Hours,10)+12;
		}
		else if (parseInt(this.Hours,10)==12) {
			this.AMorPM="PM";
			finalHour=12;
		}
		else if (this.Hours>12)	{
			this.AMorPM="PM";
			if ((this.Hours-12)<10)
				finalHour="0"+((parseInt(this.Hours,10))-12);
			else
				finalHour=parseInt(this.Hours,10)-12;
		}
		else {
			this.AMorPM="AM";
			if (this.Hours<10)
				finalHour="0"+parseInt(this.Hours,10);
			else
				finalHour=this.Hours;
		}
	}
	else if (datetimepicker.TimeMode==24) {
		if (this.Hours<10)
			finalHour="0"+parseInt(this.Hours,10);
		else
			finalHour=this.Hours;
	}
	return finalHour;
}
Calendar.prototype.getShowHour=getShowHour;

function getShowAMorPM() {
	return this.AMorPM;
}
Calendar.prototype.getShowAMorPM=getShowAMorPM;

function GetMonthName(IsLong) {
	var Month=datetimepicker.MonthName[this.Month];
	if (IsLong)
		return Month;
	else
		return Month.substr(0,3);
}
Calendar.prototype.GetMonthName=GetMonthName;

function GetMonDays() { //Get number of days in a month
	var DaysInMonth=[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	if (this.IsLeapYear()) {
		DaysInMonth[1]=29;
	}
	return DaysInMonth[this.Month];
}
Calendar.prototype.GetMonDays=GetMonDays;

function IsLeapYear() {
	if ((this.Year%4)==0) {
		if ((this.Year%100==0) && (this.Year%400)!=0) {
			return false;
		}
		else {
			return true;
		}
	}
	else {
		return false;
	}
}
Calendar.prototype.IsLeapYear=IsLeapYear;

function FormatDate(pDate)
{
	var MonthDigit=this.Month+1;
	if (datetimepicker.PrecedeZero==true) {
		if (pDate<10)
			pDate="0"+pDate;
		if (MonthDigit<10)
			MonthDigit="0"+MonthDigit;
	}

	if (this.Format.toUpperCase()=="DDMMYYYY")
		return (pDate+datetimepicker.DateSeparator+MonthDigit+datetimepicker.DateSeparator+this.Year);
	else if (this.Format.toUpperCase()=="DDMMMYYYY")
		return (pDate+datetimepicker.DateSeparator+this.GetMonthName(false)+datetimepicker.DateSeparator+this.Year);
	else if (this.Format.toUpperCase()=="MMDDYYYY")
		return (MonthDigit+datetimepicker.DateSeparator+pDate+datetimepicker.DateSeparator+this.Year);
	else if (this.Format.toUpperCase()=="MMMDDYYYY")
		return (this.GetMonthName(false)+datetimepicker.DateSeparator+pDate+datetimepicker.DateSeparator+this.Year);
	else if (this.Format.toUpperCase()=="YYYYMMDD")
		return (this.Year+datetimepicker.DateSeparator+MonthDigit+datetimepicker.DateSeparator+pDate);
	else if (this.Format.toUpperCase()=="YYYYMMMDD")
		return (this.Year+datetimepicker.DateSeparator+this.GetMonthName(false)+datetimepicker.DateSeparator+pDate);
	else
		return (pDate+datetimepicker.DateSeparator+(this.Month+1)+datetimepicker.DateSeparator+this.Year);
}
Calendar.prototype.FormatDate=FormatDate;

function closewin(id) {
   var CalId = document.getElementById(id);
   CalId.focus();
   datetimepicker.winCal.style.visibility='hidden';
 }

function changeBorder(element, col) {
  if (col == 0) {
    element.style.borderColor = "black";
    element.style.cursor = "pointer";
  }
  else {
    element.style.borderColor = "white";
    element.style.cursor = "auto";
  }
}

function pickIt(evt) {
   // accesses the element that generates the event and retrieves its ID
   if (window.addEventListener) { // w3c  
	  var objectID = evt.target.id;
      if (objectID.indexOf(datetimepicker.calSpanID) != -1){
         var dom = document.getElementById(objectID);
         datetimepicker.cnLeft=evt.pageX;
         datetimepicker.cnTop=evt.pageY;

         if (dom.offsetLeft){
           datetimepicker.cnLeft = (datetimepicker.cnLeft - dom.offsetLeft); datetimepicker.cnTop = (datetimepicker.cnTop - dom.offsetTop);
          }
       }
	  // get mouse position on click
	  datetimepicker.xpos = (evt.pageX);
	  datetimepicker.ypos = (evt.pageY);
	}
   else { // IE
	  var objectID = event.srcElement.id;
      datetimepicker.cnLeft=event.offsetX;
      datetimepicker.cnTop=(event.offsetY);
	  // get mouse position on click
	  var de = document.documentElement;
      var b = document.body;
      datetimepicker.xpos = event.clientX + (de.scrollLeft || b.scrollLeft) - (de.clientLeft || 0);
      datetimepicker.ypos = event.clientY + (de.scrollTop || b.scrollTop) - (de.clientTop || 0);
    }
   // verify if this is a valid element to pick
   if (objectID.indexOf(datetimepicker.calSpanID) != -1){
      datetimepicker.domStyle = document.getElementById(objectID).style;
    }
   if (datetimepicker.domStyle) {
      datetimepicker.domStyle.zIndex = 100;
      return false;
    }
   else {
      datetimepicker.domStyle = null;
      return;
    }
 }

function dragIt(evt) {
   if (datetimepicker.domStyle) {
      if (window.Event) {
         datetimepicker.domStyle.left = (evt.clientX-datetimepicker.cnLeft + document.body.scrollLeft)+'px';
         datetimepicker.domStyle.top = (evt.clientY-datetimepicker.cnTop + document.body.scrollTop)+'px';
       }
      else {
         datetimepicker.domStyle.left = (event.clientX-datetimepicker.cnLeft + document.body.scrollLeft)+'px';
         datetimepicker.domStyle.top = (event.clientY-datetimepicker.cnTop + document.body.scrollTop)+'px';
       }
    }
 }

function dropIt() {
   if (datetimepicker.domStyle) {
      datetimepicker.domStyle.zIndex = 0;
      datetimepicker.domStyle = null;
    }
 }