using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using Outlook = Microsoft.Office.Interop.Outlook;
using Office = Microsoft.Office.Core;

namespace VSTOPrototyp.UI.UserControls
{
    /// <summary>
    /// Interaktionslogik für Tab_Übersicht.xaml
    /// </summary>
    public partial class Tab_Übersicht : UserControl
    {
        public Tab_Übersicht()
        {
            InitializeComponent();
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            Outlook.Folder calFolder =
                ThisAddIn.Addin.Application.Session.GetDefaultFolder(
                        Outlook.OlDefaultFolders.olFolderCalendar)
                    as Outlook.Folder;
            DateTime start = DateTime.FromOADate(0);
            DateTime end = DateTime.Now;
            Outlook.Items rangeAppts = GetAppointmentsInRange(calFolder, start, end);
            if (rangeAppts != null)
            {
                foreach (Outlook.AppointmentItem appt in rangeAppts)
                {
                    listAppointment.Items.Add("Subject: " + appt.Subject
                                                          + " Start: " + appt.Start.ToString("g"));
                }
            }
        }

        /// <summary>
        /// Get recurring appointments in date range.
        /// </summary>
        /// <param name="folder"></param>
        /// <param name="startTime"></param>
        /// <param name="endTime"></param>
        /// <returns>Outlook.Items</returns>
        private Outlook.Items GetAppointmentsInRange(Outlook.Folder folder, DateTime startTime, DateTime endTime)
        {
            string filter = "[Start] >= '"
                            + startTime.ToString("g")
                            + "' AND [End] <= '"
                            + endTime.ToString("g") + "'";
            try
            {
                Outlook.Items calItems = folder.Items;
                calItems.IncludeRecurrences = true;
                calItems.Sort("[Start]", Type.Missing);
                Outlook.Items restrictItems = calItems.Restrict(filter);
                if (restrictItems.Count > 0)
                {
                    return restrictItems;
                }
                else
                {
                    return null;
                }
            }
            catch
            {
                return null;
            }
        }
    }
}