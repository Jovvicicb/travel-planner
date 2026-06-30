using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using QRCoder;
using TravelPlanner.ReportService.Models.Reports;

namespace TravelPlanner.ReportService.Generation.Reports
{
    public class TravelPlanReportGenerator : ITravelPlanReportGenerator
    {
        public byte[] Generate(TravelPlanReportData reportData)
        {
            QuestPDF.Settings.License = LicenseType.Community;

            return Document.Create(container =>
            {
                container.Page(page =>
                {
                    page.Margin(35);

                    page.Header().Element(AddHeader);

                    page.Content().PaddingTop(18).Column(column =>
                    {
                        column.Spacing(18);

                        AddTripInfo(column, reportData);
                        AddBudgetSummary(column, reportData);
                        AddDestinations(column, reportData);
                        AddActivities(column, reportData);
                        AddExpenses(column, reportData);
                        AddChecklist(column, reportData);
                        AddReminders(column, reportData);
                        AddShareLinks(column, reportData);
                    });

                    page.Footer().AlignCenter().Text(text =>
                    {
                        text.Span("TravelPlanner • Page ")
                            .FontSize(9)
                            .FontColor(Colors.Grey.Darken1);

                        text.CurrentPageNumber()
                            .FontSize(9)
                            .FontColor(Colors.Grey.Darken1);

                        text.Span(" / ")
                            .FontSize(9)
                            .FontColor(Colors.Grey.Darken1);

                        text.TotalPages()
                            .FontSize(9)
                            .FontColor(Colors.Grey.Darken1);
                    });
                });
            }).GeneratePdf();
        }

        private static void AddHeader(IContainer container)
        {
            container.Column(column =>
            {
                column.Item().Row(row =>
                {
                    row.RelativeItem().Column(header =>
                    {
                        header.Item().Text("Travel Plan Report")
                            .FontSize(24)
                            .Bold()
                            .FontColor(Colors.Blue.Darken3);

                        header.Item().PaddingTop(2).Text("Complete travel overview with destinations, activities, expenses, reminders and active share links")
                            .FontSize(10)
                            .FontColor(Colors.Grey.Darken1);
                    });

                    row.ConstantItem(170).AlignRight().Column(info =>
                    {
                        info.Item().AlignRight().Text("Generated")
                            .FontSize(9)
                            .Bold()
                            .FontColor(Colors.Grey.Darken2);

                        info.Item().AlignRight().Text($"{DateTime.Now:dd.MM.yyyy HH:mm}")
                            .FontSize(10)
                            .FontColor(Colors.Grey.Darken1);
                    });
                });

                column.Item()
                    .PaddingTop(10)
                    .LineHorizontal(1.5f)
                    .LineColor(Colors.Blue.Darken2);
            });
        }

        private static void AddSectionTitle(ColumnDescriptor column, string title)
        {
            column.Item()
                .PaddingTop(2)
                .Column(section =>
                {
                    section.Item().Text(title)
                        .FontSize(15)
                        .Bold()
                        .FontColor(Colors.Blue.Darken2);

                    section.Item()
                        .PaddingTop(3)
                        .LineHorizontal(1)
                        .LineColor(Colors.Blue.Lighten3);
                });
        }

        private static void AddTripInfo(ColumnDescriptor column, TravelPlanReportData data)
        {
            var plan = data.TravelPlan;

            AddSectionTitle(column, "Trip information");

            column.Item()
                .Border(1)
                .BorderColor(Colors.Blue.Lighten3)
                .Background(Colors.Blue.Lighten5)
                .Padding(12)
                .Column(item =>
                {
                    item.Spacing(6);

                    item.Item().Text(plan.Title)
                        .FontSize(16)
                        .Bold()
                        .FontColor(Colors.Blue.Darken3);

                    AddLabelValue(item, "Period", $"{FormatDate(plan.StartDate)} - {FormatDate(plan.EndDate)}");
                    AddLabelValue(item, "Budget", FormatMoney(plan.Budget));
                    AddLabelValue(item, "Description", plan.Description);
                    AddLabelValue(item, "Notes", plan.Notes);
                });
        }

        private static void AddBudgetSummary(ColumnDescriptor column, TravelPlanReportData data)
        {
            if (data.BudgetSummary == null)
            {
                return;
            }

            AddSectionTitle(column, "Budget summary");

            var summary = data.BudgetSummary;

            column.Item()
                .Border(1)
                .BorderColor(summary.IsOverBudget ? Colors.Red.Lighten2 : Colors.Green.Lighten2)
                .Padding(10)
                .Column(item =>
                {
                    item.Spacing(5);

                    AddLabelValue(item, "Planned budget", FormatMoney(summary.PlannedBudget));
                    AddLabelValue(item, "Total expenses", FormatMoney(summary.TotalExpenses));
                    AddLabelValue(item, "Remaining budget", FormatMoney(summary.RemainingBudget));

                    item.Item().Text(text =>
                    {
                        text.Span("Status: ").Bold();

                        if (summary.IsOverBudget)
                        {
                            text.Span("Over budget")
                                .FontColor(Colors.Red.Darken2)
                                .Bold();
                        }
                        else
                        {
                            text.Span("Within budget")
                                .FontColor(Colors.Green.Darken2)
                                .Bold();
                        }
                    });
                });
        }

        private static void AddDestinations(ColumnDescriptor column, TravelPlanReportData data)
        {
            AddSectionTitle(column, "Destinations");

            if (data.Destinations.Count == 0)
            {
                AddEmptyMessage(column, "No destinations added.");
                return;
            }

            foreach (var destination in data.Destinations.OrderBy(destination => destination.StartDate))
            {
                column.Item()
                    .BorderBottom(1)
                    .BorderColor(Colors.Grey.Lighten2)
                    .PaddingBottom(8)
                    .Column(item =>
                    {
                        item.Spacing(3);

                        item.Item().Text(destination.Name)
                            .FontSize(12)
                            .Bold()
                            .FontColor(Colors.Grey.Darken4);

                        AddLabelValue(item, "Location", destination.Location);
                        AddLabelValue(item, "Period", $"{FormatDate(destination.StartDate)} - {FormatDate(destination.EndDate)}");
                        AddLabelValue(item, "Notes", destination.Notes);
                    });
            }
        }

        private static void AddActivities(ColumnDescriptor column, TravelPlanReportData data)
        {
            AddSectionTitle(column, "Activities");

            if (data.CalendarDays.Count == 0)
            {
                AddEmptyMessage(column, "No activities added.");
                return;
            }

            foreach (var day in data.CalendarDays.OrderBy(day => day.Date))
            {
                column.Item()
                    .PaddingTop(4)
                    .Column(dayColumn =>
                    {
                        dayColumn.Spacing(8);

                        dayColumn.Item().Column(header =>
                        {
                            header.Item().Text($"{day.Date:dddd, dd.MM.yyyy}")
                                .FontSize(12)
                                .Bold()
                                .FontColor(Colors.Blue.Darken3);

                            header.Item()
                                .PaddingTop(3)
                                .LineHorizontal(1.5f)
                                .LineColor(Colors.Blue.Darken2);
                        });

                        if (day.Activities.Count == 0)
                        {
                            dayColumn.Item()
                                .PaddingLeft(6)
                                .Text("No activities planned for this day.")
                                .FontSize(10)
                                .FontColor(Colors.Grey.Darken1);

                            return;
                        }

                        foreach (var activity in day.Activities.OrderBy(activity => activity.StartTime))
                        {
                            dayColumn.Item()
                                .Border(1)
                                .BorderColor(Colors.Grey.Lighten2)
                                .Padding(10)
                                .Column(activityColumn =>
                                {
                                    activityColumn.Spacing(4);

                                    activityColumn.Item().Text(activity.Title)
                                        .FontSize(12)
                                        .Bold()
                                        .FontColor(Colors.Grey.Darken4);

                                    AddLabelValue(activityColumn, "Start time", FormatTime(activity.StartTime));
                                    AddLabelValue(activityColumn, "End time", FormatTime(activity.EndTime));
                                    AddLabelValue(activityColumn, "Location", activity.Location);
                                    AddLabelValue(activityColumn, "Description", activity.Description);
                                    AddLabelValue(activityColumn, "Estimated cost", FormatMoney(activity.EstimatedCost));
                                    AddLabelValue(activityColumn, "Status", activity.Status.ToString());
                                });
                        }
                    });
            }
        }

        private static void AddExpenses(ColumnDescriptor column, TravelPlanReportData data)
        {
            AddSectionTitle(column, "Expenses");

            if (data.Expenses.Count == 0)
            {
                AddEmptyMessage(column, "No expenses added.");
                return;
            }

            foreach (var expense in data.Expenses.OrderBy(expense => expense.ExpenseDate))
            {
                column.Item()
                    .Border(1)
                    .BorderColor(Colors.Grey.Lighten2)
                    .Padding(10)
                    .Column(item =>
                    {
                        item.Spacing(4);

                        item.Item().Row(row =>
                        {
                            row.RelativeItem().Text(expense.Title)
                                .FontSize(12)
                                .Bold()
                                .FontColor(Colors.Grey.Darken4);

                            row.ConstantItem(120).AlignRight().Text(FormatMoney(expense.Amount))
                                .FontSize(11)
                                .Bold()
                                .FontColor(Colors.Green.Darken2);
                        });

                        AddLabelValue(item, "Date", FormatDate(expense.ExpenseDate));
                        AddLabelValue(item, "Category", expense.Category.ToString());
                        AddLabelValue(item, "Description", expense.Description);
                    });
            }
        }

        private static void AddChecklist(ColumnDescriptor column, TravelPlanReportData data)
        {
            AddSectionTitle(column, "Checklist");

            if (data.ChecklistItems.Count == 0)
            {
                AddEmptyMessage(column, "No checklist items added.");
                return;
            }

            foreach (var checklistItem in data.ChecklistItems.OrderBy(item => item.IsCompleted).ThenBy(item => item.Title))
            {
                column.Item()
                    .BorderBottom(1)
                    .BorderColor(Colors.Grey.Lighten2)
                    .PaddingBottom(6)
                    .Row(row =>
                    {
                        row.ConstantItem(24).Text(checklistItem.IsCompleted ? "✓" : "□")
                            .FontSize(12)
                            .Bold()
                            .FontColor(checklistItem.IsCompleted ? Colors.Green.Darken2 : Colors.Grey.Darken1);

                        row.RelativeItem().Text(checklistItem.Title)
                            .FontSize(10)
                            .FontColor(Colors.Grey.Darken4);
                    });
            }
        }

        private static void AddReminders(ColumnDescriptor column, TravelPlanReportData data)
        {
            AddSectionTitle(column, "Reminders");

            if (data.Reminders.Count == 0)
            {
                AddEmptyMessage(column, "No reminders added.");
                return;
            }

            foreach (var reminder in data.Reminders.OrderBy(reminder => reminder.ReminderAt))
            {
                column.Item()
                    .Border(1)
                    .BorderColor(Colors.Grey.Lighten2)
                    .Padding(10)
                    .Column(item =>
                    {
                        item.Spacing(4);

                        item.Item().Text(reminder.Title)
                            .FontSize(12)
                            .Bold()
                            .FontColor(Colors.Grey.Darken4);

                        AddLabelValue(item, "Reminder at", FormatDateTime(reminder.ReminderAt));
                        AddLabelValue(item, "Status", reminder.Status.ToString());
                        AddLabelValue(item, "Description", reminder.Description);

                        if (reminder.CompletedAt.HasValue)
                        {
                            AddLabelValue(item, "Completed at", FormatDateTime(reminder.CompletedAt.Value));
                        }
                    });
            }
        }

        private static void AddShareLinks(ColumnDescriptor column, TravelPlanReportData data)
        {
            AddSectionTitle(column, "Active share links");

            if (data.ShareLinks.Count == 0)
            {
                AddEmptyMessage(column, "No active share links available.");
                return;
            }

            foreach (var share in data.ShareLinks.OrderByDescending(share => share.CreatedAt))
            {
                var link = share.ShareUrl;
                var qrBytes = GenerateQrCode(link);

                column.Item()
                    .Border(1)
                    .BorderColor(Colors.Blue.Lighten3)
                    .Padding(10)
                    .Row(row =>
                    {
                        row.RelativeItem().Column(item =>
                        {
                            item.Spacing(4);

                            AddLabelValue(item, "Access level", share.AccessLevel.ToString());
                            AddLabelValue(item, "Created at", FormatUtcDateTime(share.CreatedAt));

                            AddLabelValue(
                                item,
                                "Expires at",
                                share.ExpiresAt.HasValue
                                    ? FormatDateTime(share.ExpiresAt.Value)
                                    : "No expiration"
                            );

                            item.Item().Text(text =>
                            {
                                text.Span("Link: ").Bold();
                                text.Span(string.IsNullOrWhiteSpace(link) ? "-" : link)
                                    .FontColor(Colors.Blue.Darken2);
                            });
                        });

                        row.ConstantItem(90)
                            .Height(90)
                            .Image(qrBytes);
                    });
            }
        }

        private static void AddLabelValue(ColumnDescriptor column, string label, string? value)
        {
            column.Item().Text(text =>
            {
                text.Span($"{label}: ")
                    .Bold()
                    .FontColor(Colors.Grey.Darken3);

                text.Span(string.IsNullOrWhiteSpace(value) ? "-" : value)
                    .FontColor(Colors.Grey.Darken2);
            });
        }

        private static void AddEmptyMessage(ColumnDescriptor column, string message)
        {
            column.Item()
                .Border(1)
                .BorderColor(Colors.Grey.Lighten3)
                .Padding(10)
                .Text(message)
                .FontSize(10)
                .FontColor(Colors.Grey.Darken1);
        }

        private static string FormatDate(DateTime date)
        {
            return date.ToString("dd.MM.yyyy");
        }

        private static string FormatDateTime(DateTime dateTime)
        {
            return dateTime.ToString("dd.MM.yyyy HH:mm");
        }

        private static string FormatUtcDateTime(DateTime dateTime)
        {
            if (dateTime == default)
            {
                return "-";
            }

            var utcDateTime = dateTime.Kind == DateTimeKind.Utc
                ? dateTime
                : DateTime.SpecifyKind(dateTime, DateTimeKind.Utc);

            return utcDateTime
                .ToLocalTime()
                .ToString("dd.MM.yyyy HH:mm");
        }

        private static string FormatTime(TimeSpan time)
        {
            return time.ToString(@"hh\:mm");
        }

        private static string FormatMoney(decimal amount)
        {
            return $"{amount:N2}";
        }

        private static byte[] GenerateQrCode(string text)
        {
            using var qrGenerator = new QRCodeGenerator();
            using var qrData = qrGenerator.CreateQrCode(text, QRCodeGenerator.ECCLevel.Q);
            var qrCode = new PngByteQRCode(qrData);

            return qrCode.GetGraphic(20);
        }
    }
}